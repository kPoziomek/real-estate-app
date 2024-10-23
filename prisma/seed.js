import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateImages } from "../app/scripts/generate-images.js";

const prisma = new PrismaClient();

async function seed() {
	await prisma.listing.deleteMany();
	await prisma.user.deleteMany();

	const user = await prisma.user.create({
		data: {
			email: "test@example.com",
			password: await bcrypt.hash("testpass123", 10),
			firstName: "Jan",
			lastName: "Testowy",
		},
	});

	const images = await generateImages(12);

	const listings = [
		{
			title: "Nowoczesny apartament",
			description: "Przestronny apartament w centrum",
			price: 500000,
			area: 75,
			rooms: 3,
			city: "Kraków",
			propertyType: "mieszkania",
			listingType: "na sprzedaż",
			images: JSON.stringify(images.slice(0, 3)),
			userId: user.id,
		},
		{
			title: "Luksusowy dom",
			description: "Duży dom z basenem",
			price: 1500000,
			area: 300,
			rooms: 5,
			city: "Kraków",
			propertyType: "domy",
			listingType: "na sprzedaż",
			images: JSON.stringify(images.slice(3, 6)),
			userId: user.id,
		},
		{
			title: "Przestronne biuro",
			description: "Biuro w nowoczesnym budynku",
			price: 5000,
			area: 100,
			rooms: 2,
			city: "Gdańsk",
			propertyType: "biura",
			listingType: "do wynajęcia",
			images: JSON.stringify(images.slice(6, 9)),
			userId: user.id,
		},
		{
			title: "Nowoczesny apartament w centrum",
			description: "Przestronny apartament w centrum",
			price: 500000,
			area: 75,
			rooms: 3,
			city: "Warszawa",
			propertyType: "mieszkania",
			listingType: "na sprzedaż",
			images: JSON.stringify(images.slice(9, 12)),
			userId: user.id,
		},
	];

	for (const listing of listings) {
		await prisma.listing.create({
			data: {
				...listing,
				images: listing.images,
			},
		});
	}
}

seed()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
