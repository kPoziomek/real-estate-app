import { Link } from "@remix-run/react";
import { useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { SiHomeassistant } from "react-icons/si";

export const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<>
			<header className="p-4 bg-gray-800 text-gray-100">
				<div className="container flex justify-between h-16 mx-auto">
					<div className="flex z-50 gap-4">
						<Link
							rel="noopener noreferrer"
							to="/"
							aria-label="Back to homepage"
							className="flex items-center p-2"
						>
							<SiHomeassistant className="text-violet-500 w-10 h-10" />
						</Link>
						<ul className="items-stretch hidden space-x-3 lg:flex">
							<li className="flex">
								<Link
									rel="noopener noreferrer"
									to="/app/routes/listings._index"
									className="flex items-center px-4 -mb-1 border-b-2 dark:border- hover:border-violet-400"
								>
									Notice sale
								</Link>
							</li>
							<li className="flex">
								<Link
									rel="noopener noreferrer"
									to="/listings/new"
									className="flex items-center px-4 -mb-1 border-b-2 dark:border- hover:border-violet-400"
								>
									Add notice
								</Link>
							</li>
						</ul>
					</div>
					<div className="items-center flex-shrink-0 hidden lg:flex">
						<button
							type="button"
							className="px-8 py-3 font-semibold rounded bg-violet-400 text-gray-900"
						>
							Log in
						</button>
					</div>
					<button
						type="button"
						className="p-4 lg:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{!isMenuOpen ? <RxHamburgerMenu /> : <RxCross2 />}
					</button>
				</div>
			</header>

			<nav
				className={`
  lg:hidden rounded-b-xl fixed inset-y-[0] left-0 w-full bg-gray-800 bg-opacity-98 text-gray-100 z-10 h-1/3
  transition-all duration-500 ease-in-out
 ${isMenuOpen ? "transform translate-y-[96px] opacity-100 animate-slide-in" : "transform -translate-y-full opacity-0 animate-slide-out"}
`}
			>
				<div className="flex flex-col items-start justify-center h-full pl-8">
					<ul className="space-y-8">
						<li>
							<Link
								to="/app/routes/listings._index"
								className="text-xl font-bold hover:text-accent-300"
								onClick={() => setIsMenuOpen(false)}
							>
								Notice sale
							</Link>
						</li>
						<li>
							<Link
								to="/listings/new"
								className="text-xl font-bold hover:text-accent-300"
								onClick={() => setIsMenuOpen(false)}
							>
								Add notice
							</Link>
						</li>
						<li>
							<Link
								to="/login"
								className="text-xl font-bold hover:text-accent-300"
								onClick={() => setIsMenuOpen(false)}
							>
								Log in
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};
