import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";

export default function MainLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen bg-gray-900">
			<Header />
			<main className="flex-grow container mx-auto my-8 px-4">{children}</main>
			<Footer />
		</div>
	);
}
