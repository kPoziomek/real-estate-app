import { Link } from "@remix-run/react";

interface FeaturedListingProps {
	id: string;
	title: string;
	price: number;
	location: string;
	imageUrl: string;
}

export default function FeaturedListing({
	id,
	title,
	price,
	location,
	imageUrl,
}: FeaturedListingProps) {
	return (
		<div
			className="max-w-sm rounded-md shadow-md bg-gray-900 text-gray-100
		transition-transform transform hover:scale-105 overflow-hidden
		"
		>
			<img
				src={imageUrl}
				alt={title}
				className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
			/>
			<div className="flex flex-col justify-between p-6 space-y-8">
				<div className="space-y-2">
					<h2 className="text-3xl font-semibold tracking-wide">
						{price.toLocaleString("pl-PL", {
							style: "currency",
							currency: "PLN",
						})}
					</h2>
					<p className="text-gray-100">{title}</p>
					<span className="text-gray-400">{location}</span>
				</div>
				<Link to={`/listings/${id}`} className="group">
					<button
						type="button"
						className="flex self-end items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-400 text-gray-900"
					>
						View details
					</button>
				</Link>
			</div>
		</div>
	);
}
