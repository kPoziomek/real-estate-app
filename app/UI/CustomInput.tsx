import type React from "react";
import type { ChangeEvent } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";

type Props = {
	label: string;
	placeholder: string;
	type: string;
	handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
	value: string;
	className?: string;
	icon?: React.ReactNode;
};

export const CustomInput = ({
	label,
	placeholder,
	handleInput,
	type,
	value,
	className,
	icon = <RxMagnifyingGlass />,
}: Props) => {
	return (
		<fieldset className={`${className} text-gray-100`}>
			<label htmlFor={label} className="hidden">
				{label}
			</label>
			<div className="relative w-full">
				<span className="absolute inset-y-0 left-0 flex items-center pl-2">
					<button
						type="button"
						title={label}
						className="p-1 focus:outline-none focus:ring"
					>
						{icon}
					</button>
				</span>
				<input
					type={type}
					value={value}
					onChange={(e) => handleInput(e)}
					name={label}
					placeholder={placeholder}
					className="w-full py-2 pl-10 text-sm rounded-md border border-gray-100 focus:outline-none bg-gray-800 text-gray-100 focus:bg-gray-900 focus:border-violet-400 hover:border-violet-600"
				/>
			</div>
		</fieldset>
	);
};
