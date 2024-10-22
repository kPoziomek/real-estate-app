import { type ActionFunction, json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSubmit } from "@remix-run/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { CustomFormInput } from "~/UI/CustomFormInput";
import MainLayout from "~/components/MainLayout";

export interface ILoginForm {
	email: string;
	password: string;
}

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");

	// add real authentication logic here
	if (email === "test@example.com" && password === "password") {
		// Set user session (this will be implemented later)
		return redirect("/");
	}

	return json({ error: "Nieprawidłowy email lub hasło" });
};

export default function Login() {
	const actionData = useActionData();
	const submit = useSubmit();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginForm>();

	const onSubmit: SubmitHandler<ILoginForm> = (data) => {
		console.log(data);
		submit(data, { method: "post" });
	};

	return (
		<MainLayout>
			<div className="max-w-md mx-auto mt-10">
				<div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-900 text-gray-100">
					<div className="mb-8 text-center">
						<h1 className="my-3 text-4xl font-bold">Sign in</h1>
						<p className="text-sm text-gray-400">
							Sign in to access your account
						</p>
					</div>
					<Form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
						<div className="space-y-4">
							<CustomFormInput
								type="text"
								label="email"
								register={register}
								inputName="email"
								placeholder="\@example.com"
								requiredMessage="Email is required"
								patternObject={{
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: "Invalid email address",
								}}
								errors={errors.email}
							/>
							<CustomFormInput
								label="Password"
								placeholder="*****"
								inputName="password"
								requiredMessage="Password is required"
								type="password"
								register={register}
								errors={errors.password}
							/>
						</div>

						{actionData?.error && (
							<p className="text-sm text-red-600">{actionData.error}</p>
						)}
						<div className="space-y-2">
							<div>
								<button
									type="submit"
									className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900"
								>
									Sign in
								</button>
							</div>
							<p className="px-6 text-sm text-center text-gray-400">
								Don&#39;t have an account yet?
								<Link
									rel="noopener noreferrer"
									to="/register"
									className="hover:underline text-violet-400"
								>
									Sign up
								</Link>
								.
							</p>
						</div>
					</Form>
				</div>
			</div>
		</MainLayout>
	);
}
