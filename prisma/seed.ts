import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
	console.log("Seeding database...");
	const email = "test@example.com";

	await prisma.user.delete({ where: { email } }).catch(() => {
		console.log("User not found");
	});

	const hashedPassword = await bcrypt.hash("password", 10);

	const user = await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
			firstName: "Test",
			lastName: "User",
		},
	});

	console.log(`Database has been seeded with user: ${user.email}`);
}

if (process.env.NODE_ENV !== "production") {
	seed()
		.catch((e) => {
			console.log(e);
			process.exit(1);
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
}
