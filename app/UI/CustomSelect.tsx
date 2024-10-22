import Select from "react-select";
import "./customSelect.css";
import type { OptionType } from "~/contexts/SearchContext";

type Props = {
	selectOption: { value: string; label: string }[];
	setSelectOption: (option: OptionType | null) => void;
	placeholder: string;
	value?: OptionType | null;
	isDisabled?: boolean;
};

export const CustomSelect = ({
	selectOption,
	setSelectOption,
	placeholder,
	isDisabled = false,
	value,
}: Props) => {
	return (
		<Select
			value={value}
			placeholder={placeholder}
			className="react-select-container"
			classNamePrefix="react-select"
			onChange={(option) => setSelectOption(option)}
			options={selectOption}
			isDisabled={isDisabled}
		/>
	);
};
