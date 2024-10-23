import { type LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import MainLayout from "~/components/MainLayout";

import { getListingById } from "~/models/listing.server";

export const loader: LoaderFunction = async ({ params }) => {
	const listing = await getListingById(Number(params.slug));
	if (!listing) {
		return json({ error: "Listing not found" }, { status: 404 });
	}

	return json({ listing });
};

export default function ListingDetails() {
	const { listing } = useLoaderData<typeof loader>();

	return (
		<MainLayout>
			<div className="max-w-4xl mx-auto px-4 py-8 text-gray-100">
				<h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
				<p className="text-xl text-gray-200 mb-4">{listing.location}</p>
				<div className="mb-8">
					<img
						src={listing.images[0].url}
						alt={listing.title}
						className="w-full h-96 object-cover rounded-lg"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
					<div>
						<h2 className="text-2xl font-semibold mb-4">Details</h2>
						<ul className="space-y-2">
							<li>
								<strong>Cena:</strong> {listing.price.toLocaleString("pl-PL")}{" "}
								PLN
							</li>
							<li>
								<strong>Area:</strong> {listing.area} m²
							</li>
							<li>
								<strong>Rooms:</strong> {listing.rooms}
							</li>
							<li>
								<strong>Property Type:</strong> {listing.propertyType}
							</li>
							<li>
								<strong>Listing Type:</strong> {listing.listingType}
							</li>
						</ul>
					</div>
					<div>
						<h2 className="text-2xl font-semibold mb-4">Desciription</h2>
						<p>{listing.description}</p>
					</div>
				</div>
				<div>
					<h2 className="text-2xl font-semibold mb-4">Gallery</h2>
					<div className="grid grid-cols-3 gap-4">
						{listing.images.map((image, index) => (
							<img
								key={index}
								src={image.url}
								alt={`Zdjęcie ${index + 1}`}
								className="w-full h-40 object-cover rounded-lg"
							/>
						))}
					</div>
				</div>
			</div>
		</MainLayout>
	);
}
