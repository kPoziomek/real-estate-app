import { type LoaderFunction, json } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import MainLayout from "~/components/MainLayout";

// Typ dla danych ogłoszenia
interface Listing {
	id: string;
	title: string;
	description: string;
	price: number;
	area: number;
	rooms: number;
	location: string;
	propertyType: string;
	listingType: string;
	imageUrls: string[];
}

import luxuryImage from "~/images/luxuryPenthouse.webp";
import luxuryImage2 from "~/images/luxuryPenthouse2.webp";
import luxuryImage3 from "~/images/luxuryPenthouse3.webp";

// Mock function to fetch listing data
const fetchListing = async (id: string): Promise<Listing> => {
	// Mock data
	return {
		id,
		title: "Nowoczesny apartament w centrum",
		description:
			"Piękny, przestronny apartament w samym sercu miasta. Idealne miejsce dla osób ceniących miejski styl życia.",
		price: 500000,
		area: 75,
		rooms: 3,
		location: "Warszawa, Śródmieście",
		propertyType: "mieszkanie",
		listingType: "na sprzedaż",
		imageUrls: [luxuryImage, luxuryImage2, luxuryImage3],
	};
};

export const loader: LoaderFunction = async ({ params }) => {
	const listing = await fetchListing(params.id as string);
	return json(listing);
};

export default function ListingDetails() {
	const listing = useLoaderData<Listing>();

	return (
		<MainLayout>
			<div className="max-w-4xl mx-auto px-4 py-8 text-gray-100">
				<h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
				<p className="text-xl text-gray-200 mb-4">{listing.location}</p>
				<div className="mb-8">
					<img
						src={listing.imageUrls[0]}
						alt={listing.title}
						className="w-full h-96 object-cover rounded-lg"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
					<div>
						<h2 className="text-2xl font-semibold mb-4">Szczegóły</h2>
						<ul className="space-y-2">
							<li>
								<strong>Cena:</strong> {listing.price.toLocaleString("pl-PL")}{" "}
								PLN
							</li>
							<li>
								<strong>Powierzchnia:</strong> {listing.area} m²
							</li>
							<li>
								<strong>Liczba pokoi:</strong> {listing.rooms}
							</li>
							<li>
								<strong>Typ nieruchomości:</strong> {listing.propertyType}
							</li>
							<li>
								<strong>Typ ogłoszenia:</strong> {listing.listingType}
							</li>
						</ul>
					</div>
					<div>
						<h2 className="text-2xl font-semibold mb-4">Opis</h2>
						<p>{listing.description}</p>
					</div>
				</div>
				<div>
					<h2 className="text-2xl font-semibold mb-4">Galeria</h2>
					<div className="grid grid-cols-3 gap-4">
						{listing.imageUrls.map((url, index) => (
							<img
								key={index}
								src={url}
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
