import type { FieldError, UseFormRegister } from "react-hook-form";

type Props = {
	label: string;
	placeholder: string;
	inputName: string;
	requiredMessage: string;
	patternType?: string;
	patternObject?: {
		value: number | string | RegExp;
		message: string;
	};
	type: string;
	register: UseFormRegister<any>;
	errors: FieldError | undefined;
};

export const CustomFormInput = ({
	label,
	inputName,
	placeholder,
	type,
	register,
	errors,
	patternType,
	requiredMessage,
	patternObject,
}: Props) => {
	return (
		<div>
			<label htmlFor="label" className="block mb-2 text-sm">
				{label}
			</label>
			<input
				{...register(inputName, {
					required: requiredMessage,
					[patternType]: patternObject,
				})}
				type={type}
				name={inputName}
				id={inputName}
				placeholder={placeholder}
				className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100"
			/>
			<div
				data-lastpass-icon-root=""
				className="position: relative !important; height: 0px !important; width: 0px !important; float: left !important;"
			/>
			{errors && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
		</div>
	);
};
