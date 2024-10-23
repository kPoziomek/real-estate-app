import { createApi } from "unsplash-js";
const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY || "",
	fetch: fetch,
});

const PROPERTY_KEYWORDS = [
	"modern apartment",
	"luxury house",
	"modern home interior",
];

export async function generateImages(count) {
	const images = [];
	console.log(images);
	for (let i = 0; i < count; i++) {
		const keyword =
			PROPERTY_KEYWORDS[Math.floor(Math.random() * PROPERTY_KEYWORDS.length)];
		const result = await unsplash.search.getPhotos({
			query: keyword,
			page: 1,
			perPage: 1,
			orientation: "landscape",
		});

		if ("errors" in result) throw new Error("Failed to fetch from Unsplash");

		if (result.response) {
			const photo = result.response.results[0];
			images.push({
				url: photo.urls.regular,
				credit: {
					name: photo.user.name,
					link: photo.user.links.html,
				},
			});
		}
	}

	return images;
}
