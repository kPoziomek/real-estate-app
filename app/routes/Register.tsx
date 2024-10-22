import { type ActionFunction, json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSubmit } from "@remix-run/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { CustomFormInput } from "~/UI/CustomFormInput";
import MainLayout from "~/components/MainLayout";

interface IRegisterForm {
	email: string;
	password: string;
	confirmPassword: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
}

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	// basic server-side validation
	if (data.password !== data.confirmPassword) {
		return json({ error: "Hasła nie są identyczne" });
	}
	// Tutaj w przyszłości dodamy rzeczywistą logikę rejestracji
	console.log("Nowy użytkownik:", data);

	// after successful registration redirect to login
	return redirect("/login");
};

export default function Register() {
	const actionData = useActionData();
	const submit = useSubmit();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<IRegisterForm>();

	const password = watch("password");

	const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
		submit(data, { method: "post" });
	};

	return (
		<MainLayout>
			<div className="max-w-md mx-auto mt-10">
				<div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-900 text-gray-100">
					<div className="mb-8 text-center">
						<h1 className="my-3 text-4xl font-bold">Register</h1>
						<p className="text-sm text-gray-400">
							Register to access your account
						</p>
					</div>
					<Form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
						<div className="space-y-4">
							<CustomFormInput
								patternObject={{
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: "Incorrect email",
								}}
								label="Email"
								placeholder="Email"
								inputName="email"
								requiredMessage="Email is required"
								type="email"
								register={register}
								errors={errors.email}
							/>
							<CustomFormInput
								label="First Name"
								placeholder="John"
								inputName="firstName"
								requiredMessage="Name is required"
								type="text"
								register={register}
								errors={errors.firstName}
							/>
							<CustomFormInput
								label="Last Name"
								placeholder="Doe"
								inputName="lastName"
								requiredMessage="Last name is requirder"
								type="text"
								register={register}
								errors={errors.lastName}
							/>
							<CustomFormInput
								patternType="minLength"
								label="Password"
								placeholder="******"
								inputName="password"
								requiredMessage="Password is required"
								type="password"
								register={register}
								errors={errors.password}
								patternObject={{
									value: 8,
									message: "Hasło musi mieć minimum 8 znaków",
								}}
							/>
							<CustomFormInput
								label="Confirm Password"
								placeholder="*****"
								inputName="confirmPassword"
								requiredMessage="Confirm Passwrod is requirder"
								type="password"
								register={register}
								patternType="validate"
								patternObject={{
									value: password,
									message: "Passwords are not the same",
								}}
								errors={errors.confirmPassword}
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
									Register
								</button>
							</div>
							<p className="px-6 text-sm text-center text-gray-400">
								Already have an account?
								<Link
									rel="noopener noreferrer"
									to="/login"
									className="hover:underline text-violet-400"
								>
									Log in
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
