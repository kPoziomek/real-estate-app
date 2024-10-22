import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import FeaturedListing from "~/components/FeaturedListing";
import MainLayout from "~/components/MainLayout";
import homeImage from "~/images/homeImage.webp";
import luxuryImage from "~/images/luxuryPenthouse.webp";
import apartment from "~/images/modernApartament.webp";
export const meta: MetaFunction = () => {
	return [
		{ title: "Ogłoszenia - RealEstate Portal" },
		{
			name: "description",
			content: "Przeglądaj wszystkie oferty nieruchomości",
		},
	];
};

// Temporary mocked data
const MOCK_LISTINGS = [
	{
		id: "1",
		title: "Nowoczesny apartament w centrum",
		price: 500000,
		location: "Warszawa, Śródmieście",
		imageUrl: apartment,
	},
	{
		id: "2",
		title: "Przytulny domek na przedmieściach",
		price: 450000,
		location: "Kraków, Bronowice",
		imageUrl: { homeImage },
	},
	{
		id: "3",
		title: "Luksusowy penthouse z widokiem na morze",
		price: 1200000,
		location: "Gdańsk, Przymorze",
		imageUrl: luxuryImage,
	},
];

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const searchTerm = url.searchParams.get("searchTerm") || "";
	const minPrice = Number(url.searchParams.get("minPrice")) || 0;
	const maxPrice =
		Number(url.searchParams.get("maxPrice")) || Number.POSITIVE_INFINITY;

	const filteredListings = MOCK_LISTINGS.filter(
		(listing) =>
			listing.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
			listing.price >= minPrice &&
			listing.price <= maxPrice,
	);

	return { listings: filteredListings };
};

export default function Listings_index() {
	const { listings } = useLoaderData<typeof loader>();
	const [searchParams] = useSearchParams();
	const submit = useSubmit();

	const [searchTerm, setSearchTerm] = useState(
		searchParams.get("searchTerm") || "",
	);
	const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
	const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

	useEffect(() => {
		const form = new FormData();
		form.set("searchTerm", searchTerm);
		form.set("minPrice", searchParams.get("minPrice") || "");
		form.set("maxPrice", searchParams.get("maxPrice") || "");
		submit(form, { replace: true, method: "get" });
	}, [searchTerm, submit, searchParams]);

	const handlePriceFilter = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		submit(form, { replace: true, method: "get" });
	};

	return (
		<MainLayout>
			<h1 className="text-3xl font-bold text-white mb-8">
				Ogłoszenia nieruchomości
			</h1>

			<div className="mb-8">
				<input
					type="text"
					name="searchTerm"
					placeholder="Szukaj ogłoszeń..."
					className="w-full p-2 border rounded mb-4"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<form
					onSubmit={handlePriceFilter}
					className="flex flex-col md:flex-row gap-4"
				>
					<input
						type="number"
						name="minPrice"
						placeholder="Cena min"
						className="flex-grow p-2 border rounded"
						value={minPrice}
						onChange={(e) => setMinPrice(e.target.value)}
					/>
					<input
						type="number"
						name="maxPrice"
						placeholder="Cena max"
						className="flex-grow p-2 border rounded"
						value={maxPrice}
						onChange={(e) => setMaxPrice(e.target.value)}
					/>
					<button
						type="submit"
						className="bg-primary-500 text-white p-2 rounded hover:bg-primary-600"
					>
						Filtruj ceny
					</button>
				</form>
			</div>

			<div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
				{listings.map((listing) => (
					<FeaturedListing key={listing.id} {...listing} />
				))}
			</div>

			{listings.length === 0 && (
				<p className="text-center text-gray-500 mt-8">
					Brak ogłoszeń spełniających kryteria wyszukiwania.
				</p>
			)}
		</MainLayout>
	);
}
