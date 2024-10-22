import type { FC } from "react";
import { BiMessageSquareAdd, BiMessageSquareMinus } from "react-icons/bi";
import { IoPricetagOutline, IoPricetagsOutline } from "react-icons/io5";
import { CustomInput } from "~/UI/CustomInput";
import { CustomSelect } from "~/UI/CustomSelect";
import {
	ListingTypes,
	type OptionType,
	PropertyTypes,
	useSearch,
} from "~/contexts/SearchContext";

export const SearchBar: FC = () => {
	const {
		searchCriteria,
		setSearchCriteria,
		propertyType,
		setPropertyType,
		listingType,
		setListingType,
	} = useSearch();

	const handlePropertyTypeChange = (selectedOption: OptionType | null) => {
		setPropertyType(selectedOption);
		if (selectedOption) {
			setListingType(
				ListingTypes[selectedOption.value as keyof typeof ListingTypes][0],
			);
		} else {
			setListingType(null);
		}
	};

	return (
		<div className="flex flex-col lg:flex-row gap-3 p-4 bg-gray-800 text-gray-100 rounded-lg">
			<div className="xs:w-full lg:w-1/2 space-y-3 ">
				<CustomSelect
					selectOption={PropertyTypes}
					setSelectOption={handlePropertyTypeChange}
					placeholder="Estate Type"
				/>
				<CustomSelect
					selectOption={
						propertyType
							? ListingTypes[propertyType.value as keyof typeof ListingTypes]
							: []
					}
					setSelectOption={setListingType}
					placeholder="Notice Type"
					value={listingType}
				/>
			</div>
			<div className="xs:w-full lg:w-1/2 space-y-3">
				<div className="space-y-3 ">
					<CustomInput
						value={searchCriteria.location}
						label="Location"
						placeholder="Location"
						className="w-full"
						type="text"
						handleInput={(e) =>
							setSearchCriteria({
								...searchCriteria,
								location: e.target.value,
							})
						}
					/>
				</div>
				<div className="space-y-3 ">
					<div className="flex gap-2 md:gap-4">
						<CustomInput
							className="w-1/2"
							label="minPrice"
							icon={<IoPricetagOutline />}
							placeholder="Price min"
							type="number"
							handleInput={(e) =>
								setSearchCriteria({
									...searchCriteria,
									minPrice: e.target.value,
								})
							}
							value={searchCriteria.minPrice}
						/>
						<CustomInput
							label="maxPrice"
							placeholder="Price max"
							type="number"
							icon={<IoPricetagsOutline />}
							handleInput={(e) =>
								setSearchCriteria({
									...searchCriteria,
									maxPrice: e.target.value,
								})
							}
							value={searchCriteria.maxPrice}
							className="w-1/2"
						/>
					</div>
					<div className="flex gap-2 md:gap-4">
						<CustomInput
							className="w-1/2"
							label="minArea"
							placeholder="Area min"
							icon={<BiMessageSquareMinus />}
							type="number"
							handleInput={(e) =>
								setSearchCriteria({
									...searchCriteria,
									minArea: e.target.value,
								})
							}
							value={searchCriteria.minArea}
						/>
						<CustomInput
							className="w-1/2"
							label="maxArea"
							placeholder="Area max"
							icon={<BiMessageSquareAdd />}
							type="number"
							handleInput={(e) =>
								setSearchCriteria({
									...searchCriteria,
									maxArea: e.target.value,
								})
							}
							value={searchCriteria.maxArea}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
