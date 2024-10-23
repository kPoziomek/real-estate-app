import { db } from "~/utils/db.server";

export async function getAllListings() {
	const listings = await db.listing.findMany();
	return listings.map((listing) => ({
		...listing,
		images: JSON.parse(listing.images as string),
	}));
}

export async function getListingById(id: number) {
	const listing = await db.listing.findUnique({
		where: { id },
		include: {
			user: {
				select: {
					firstName: true,
					lastName: true,
					email: true,
				},
			},
		},
	});

	if (!listing) {
		return null;
	}

	return {
		...listing,
		images: JSON.parse(listing.images as string),
	};
}
