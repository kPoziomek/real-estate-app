import { Link } from "@remix-run/react";

interface Images {
	url: string;
	credit: {
		name: string;
		link: string;
	};
}

interface FeaturedListingProps {
	id: string;
	title: string;
	price: number;
	location: string;
	images: Images[];
}

export default function FeaturedListing({
	id,
	title,
	price,
	city,
	images,
}: FeaturedListingProps) {
	return (
		<div
			className="max-w-sm rounded-md shadow-md bg-gray-900 text-gray-100
		transition-transform transform hover:scale-105 overflow-hidden
		"
		>
			<img
				src={images[0].url}
				alt={title}
				className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
			/>
			<div className="flex flex-col justify-between p-6 space-y-8 min-h-[220px]">
				<div className="space-y-2">
					<h2 className="text-3xl font-semibold tracking-wide">
						{price.toLocaleString("pl-PL", {
							style: "currency",
							currency: "PLN",
						})}
					</h2>
					<div className="flex-1">
						<p className="text-sm text-gray-100">{title}</p>
						<span className="text-gray-400">{city}</span>
					</div>
				</div>
				<Link to={`/listings/${id}`} className="group">
					<button
						type="button"
						className="flex self-end items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-400 text-gray-900  hover:bg-violet-500"
					>
						View details
					</button>
				</Link>
			</div>
		</div>
	);
}
