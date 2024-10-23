import { LoaderFunction, MetaFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import FeaturedListing from "~/components/FeaturedListing";
import MainLayout from "~/components/MainLayout";
import { SearchBar } from "~/components/SearchBar";

import { getAllListings } from "~/models/listing.server";

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
	const listings = await getAllListings();
	return json({ listings });
};

export default function Index() {
	const { listings } = useLoaderData<typeof loader>();

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
				<Link to="/listings">
					<span className="text-gray-400 text-sm ml-4">Find more</span>
				</Link>
			</h2>
			<div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 bg-gray-800 p-5 rounded-md justify-center items-center">
				{listings.slice(0, 3).map((listing) => (
					<FeaturedListing key={listing.id} {...listing} />
				))}
			</div>
		</MainLayout>
	);
}
