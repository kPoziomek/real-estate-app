import { type ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData, useSubmit } from "@remix-run/react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import MainLayout from "~/components/MainLayout";
import { ListingTypes, PropertyTypes } from "~/contexts/SearchContext";

interface IFormInput {
	title: string;
	description: string;
	price: number;
	area: number;
	rooms: number;
	location: string;
	propertyType: string;
	listingType: string;
}

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	// Here add logic to save the listing to the database or other storage
	console.log("Nowe ogłoszenie:", data);
	// navigate to page with listing after successful add
	return redirect("/listings");
};

export default function NewListing() {
	const submit = useSubmit();
	const [selectedPropertyType, setSelectedPropertyType] = useState(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		submit(data, { method: "post" });
	};

	return (
		<MainLayout>
			<div className="max-w-2xl mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-8">Dodaj nowe ogłoszenie</h1>
				<Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div>
						<label
							htmlFor="title"
							className="block text-sm font-medium text-gray-700"
						>
							Tytuł
						</label>
						<input
							{...register("title", { required: "Tytuł jest wymagany" })}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						{errors.title && (
							<p className="mt-2 text-sm text-red-600">
								{errors.title.message}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="description"
							className="block text-sm font-medium text-gray-700"
						>
							Opis
						</label>
						<textarea
							{...register("description", { required: "Opis jest wymagany" })}
							rows={4}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						{errors.description && (
							<p className="mt-2 text-sm text-red-600">
								{errors.description.message}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="price"
							className="block text-sm font-medium text-gray-700"
						>
							Cena
						</label>
						<input
							{...register("price", { required: "Cena jest wymagana", min: 0 })}
							type="number"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						{errors.price && (
							<p className="mt-2 text-sm text-red-600">
								{errors.price.message}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="area"
							className="block text-sm font-medium text-gray-700"
						>
							Powierzchnia (m²)
						</label>
						<input
							{...register("area", {
								required: "Powierzchnia jest wymagana",
								min: 0,
							})}
							type="number"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						{errors.area && (
							<p className="mt-2 text-sm text-red-600">{errors.area.message}</p>
						)}
					</div>

					<div>
						<label
							htmlFor="rooms"
							className="block text-sm font-medium text-gray-700"
						>
							Liczba pokoi
						</label>
						<input
							{...register("rooms", {
								required: "Liczba pokoi jest wymagana",
								min: 1,
							})}
							type="number"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						{errors.rooms && (
							<p className="mt-2 text-sm text-red-600">
								{errors.rooms.message}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="location"
							className="block text-sm font-medium text-gray-700"
						>
							Lokalizacja
						</label>
						<input
							{...register("location", {
								required: "Lokalizacja jest wymagana",
							})}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						{errors.location && (
							<p className="mt-2 text-sm text-red-600">
								{errors.location.message}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="propertyType"
							className="block text-sm font-medium text-gray-700"
						>
							Typ nieruchomości
						</label>
						<Select
							options={PropertyTypes}
							onChange={(option) => {
								setSelectedPropertyType(option);
								register("propertyType").onChange({
									target: { value: option.value },
								});
							}}
							placeholder="Wybierz typ nieruchomości"
							className="mt-1"
						/>
						{errors.propertyType && (
							<p className="mt-2 text-sm text-red-600">
								{errors.propertyType.message}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="listingType"
							className="block text-sm font-medium text-gray-700"
						>
							Typ ogłoszenia
						</label>
						<Select
							options={
								selectedPropertyType
									? ListingTypes[selectedPropertyType.value]
									: []
							}
							onChange={(option) => {
								register("listingType").onChange({
									target: { value: option.value },
								});
							}}
							placeholder="Wybierz typ ogłoszenia"
							className="mt-1"
							isDisabled={!selectedPropertyType}
						/>
						{errors.listingType && (
							<p className="mt-2 text-sm text-red-600">
								{errors.listingType.message}
							</p>
						)}
					</div>

					<button
						type="submit"
						className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Dodaj ogłoszenie
					</button>
				</Form>
			</div>
		</MainLayout>
	);
}
