import bcrypt from "bcryptjs";
import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";

import { db } from "./db.server";
import { sessionStorage } from "./session.serve";

export type AuthUser = {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	isAdmin: boolean;
};

export const authenticator = new Authenticator<AuthUser>(sessionStorage);

authenticator.use(
	new FormStrategy(async ({ form }) => {
		const email = form.get("email") as string;
		const password = form.get("password") as string;

		if (!email || !password) {
			throw new AuthorizationError("Invalid email or password");
		}

		const user = await db.user.findUnique({ where: { email } });
		if (!user) {
			throw new AuthorizationError("Invalid email or password");
		}

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			throw new AuthorizationError("Invalid email or password");
		}

		return {
			id: user.id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			isAdmin: user.isAdmin,
		};
	}),
	"user-pass",
);

export async function createUser(
	email: string,
	password: string,
	firstName: string,
	lastName: string,
) {
	const hashedPassword = await bcrypt.hash(password, 10);

	return db.user.create({
		data: {
			email,
			password: hashedPassword,
			firstName,
			lastName,
		},
	});
}

export async function requireUser(request: Request) {
	return await authenticator.isAuthenticated(request, {
		failureRedirect: "/login",
	});
}

export async function requireAdmin(request: Request) {
	const user = await requireUser(request);
	if (!user.isAdmin) {
		throw new AuthorizationError("You are not authorized to view this page");
	}
	return user;
}
