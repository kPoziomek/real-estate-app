import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import FeaturedListing from "~/components/FeaturedListing";
import MainLayout from "~/components/MainLayout";
import { SearchBar } from "~/components/SearchBar";
import homeImage from "~/images/homeImage.webp";
import luxuryImage from "~/images/luxuryPenthouse.webp";
import apartment from "~/images/modernApartament.webp";
export const meta: MetaFunction = () => {
	return [
		{ title: "RealEstate Portal - Znajdź swoje wymarzone mieszkanie" },
		{
			name: "description",
			content: "Przeglądaj najlepsze oferty nieruchomości w Twojej okolicy",
		},
	];
};

export const loader: LoaderFunction = async () => {
	const featuredListings = [
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
			imageUrl: homeImage,
		},
		{
			id: "3",
			title: "Luksusowy penthouse z widokiem na morze",
			price: 1200000,
			location: "Gdańsk, Przymorze",
			imageUrl: luxuryImage,
		},
	];
	return { featuredListings };
};

export default function Index() {
	const { featuredListings } = useLoaderData<typeof loader>();

	return (
		<MainLayout>
			<h1 className="text-3xl font-bold text-gray-50 mb-8">
				Welcome to RealEstate Portal
			</h1>
			<SearchBar />

			<p className="text-xl text-gray-100 my-8">
				Finding your dream home has never been easier. Browse through our
			</p>

			<h2 className="text-2xl font-semibold text-gray-200 mb-4">
				Promoted Listings
			</h2>
			<div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 bg-gray-800 p-5 rounded-md justify-center items-center">
				{featuredListings.map((listing) => (
					<FeaturedListing key={listing.id} {...listing} />
				))}
			</div>
		</MainLayout>
	);
}
