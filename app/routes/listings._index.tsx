import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams, useSubmit } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import FeaturedListing from "~/components/FeaturedListing";
import MainLayout from "~/components/MainLayout";

import { IoPricetagOutline, IoPricetagsOutline } from "react-icons/io5";
import { CustomInput } from "~/UI/CustomInput";
import { getAllListings } from "~/models/listing.server";
export const meta: MetaFunction = () => {
	return [
		{ title: "Ogłoszenia - RealEstate Portal" },
		{
			name: "description",
			content: "Przeglądaj wszystkie oferty nieruchomości",
		},
	];
};

export const loader: LoaderFunction = async ({ request }) => {
	const listing = await getAllListings();
	const url = new URL(request.url);
	const searchTerm = url.searchParams.get("searchTerm") || "";
	const minPrice = Number(url.searchParams.get("minPrice")) || 0;
	const maxPrice =
		Number(url.searchParams.get("maxPrice")) || Number.POSITIVE_INFINITY;

	const filteredListings = listing.filter(
		(list) =>
			list.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
			list.price >= minPrice &&
			list.price <= maxPrice,
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
			<h1 className="text-3xl font-bold text-white mb-8">All Listings</h1>
			<div className="mb-3 xl:mb-8">
				<form onSubmit={handlePriceFilter} className="flex flex-wrap gap-4">
					<CustomInput
						label="searchTerm"
						placeholder="Search..."
						type="text"
						className="md:w-1/2"
						handleInput={(e) => setSearchTerm(e.target.value)}
						value={searchTerm}
					/>
					<CustomInput
						label="minPrice"
						placeholder="Min Price"
						type="number"
						icon={<IoPricetagOutline />}
						handleInput={(e) => setMinPrice(e.target.value)}
						value={minPrice}
					/>
					<CustomInput
						label="maxPrice"
						placeholder="Max Price"
						type="number"
						icon={<IoPricetagsOutline />}
						handleInput={(e) => setMaxPrice(e.target.value)}
						value={maxPrice}
					/>
					<button
						type="submit"
						className="flex self-start items-center justify-center p-2 font-semibold tracking-wide rounded-md bg-violet-400 text-gray-900 hover:bg-violet-500"
					>
						Filter by Price
					</button>
				</form>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
				{listings.map((listing) => (
					<FeaturedListing key={listing.id} {...listing} />
				))}
			</div>

			{listings.length === 0 && (
				<p className="text-center text-gray-500 mt-8">
					There are no listings matching your criteria.
				</p>
			)}
		</MainLayout>
	);
}
