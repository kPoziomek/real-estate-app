import { Link } from "@remix-run/react";

export const Footer = () => {
	return (
		<footer className="p-6 bg-gray-800 text-gray-100">
			<div className="container grid grid-cols-2 mx-auto gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
				<div className="flex flex-col space-y-4">
					<h2 className="font-medium">About RealEstate</h2>
					<div className="flex flex-col space-y-2 text-sm text-gray-400">
						<Link rel="noopener noreferrer" to="#">
							About us
						</Link>
						<Link rel="noopener noreferrer" to="#">
							Work Press
						</Link>
						<Link rel="noopener noreferrer" to="#">
							Career
						</Link>
						<Link rel="noopener noreferrer" to="#">
							Help Center
						</Link>
						<Link rel="noopener noreferrer" to="#">
							Digital Services Act
						</Link>
						<Link rel="noopener noreferrer" to="#">
							Mortgage loans
						</Link>
					</div>
				</div>
				<div className="flex flex-col space-y-4">
					<h2 className="font-medium">For Professionals</h2>
					<div className="flex flex-col space-y-2 text-sm text-gray-400">
						<Link rel="noopener noreferrer" to="#">
							Prices
						</Link>
						<Link rel="noopener noreferrer" to="#">
							Sell with RealEstate
						</Link>
						<Link rel="noopener noreferrer" to="#">
							Advertise
						</Link>
						<Link rel="noopener noreferrer" to="#">
							Certification
						</Link>
						<Link rel="noopener noreferrer" to="#">
							Partnership
						</Link>
						<Link rel="noopener noreferrer" to="#">
							RealEstate Pro
						</Link>
					</div>
				</div>
				<div className="flex flex-col space-y-4">
					<h2 className="font-medium">Data Base & Knowledge</h2>
					<div className="flex flex-col space-y-2 text-sm text-gray-400">
						<Link rel="noopener noreferrer" to="#">
							Reports from RealEstate
						</Link>
						<Link rel="noopener noreferrer" to="#">
							Market Situation
						</Link>
						<Link rel="noopener noreferrer" to="#">
							Market Trends
						</Link>
						<Link rel="noopener noreferrer" to="#">
							Market Analysis
						</Link>
						<Link rel="noopener noreferrer" to="#">
							Market Forecast
						</Link>
						<Link rel="noopener noreferrer" to="#">
							Market Insights
						</Link>
					</div>
				</div>
				<div className="flex flex-col space-y-4">
					<h2 className="font-medium">Contact</h2>
					<div className="flex flex-col space-y-2 text-sm text-gray-400">
						<Link rel="noopener noreferrer" to="#">
							Contact us
						</Link>
						<Link rel="noopener noreferrer" to="#">
							Help Center
						</Link>
						<Link rel="noopener noreferrer" to="#">
							Sales Department
						</Link>
						<Link rel="noopener noreferrer" to="#">
							Press Department
						</Link>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-center px-6 pt-12 text-sm">
				<span className="text-gray-400">
					{" "}
					&copy; 2024 RealEstate Portal. Wszelkie prawa zastrzeżone.
				</span>
			</div>
		</footer>
	);
};
