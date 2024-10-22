import {
	type FC,
	type ReactNode,
	createContext,
	useContext,
	useState,
} from "react";
export interface OptionType {
	id?: number;
	value: string;
	label: string;
}

type PropertyType = "mieszkania" | "domy" | "działki" | "lokale";
type ListingType = "na sprzedaż" | "na wynajem";

interface SearchContextType {
	searchCriteria: {
		location: string;
		minPrice: string;
		maxPrice: string;
		minArea: string;
		maxArea: string;
	};
	setSearchCriteria: (criteria: {
		location: string;
		minPrice: string;
		maxPrice: string;
		minArea: string;
		maxArea: string;
	}) => void;
	propertyType: OptionType | null;
	setPropertyType: (type: OptionType | null) => void;
	listingType: OptionType | null;
	setListingType: (type: OptionType | null) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const PropertyTypes: OptionType[] = [
	{ id: 1, value: "mieszkania", label: "Mieszkania" },
	{ id: 2, value: "domy", label: "Domy" },
	{ id: 3, value: "działki", label: "Działki" },
	{ id: 4, value: "lokale", label: "Lokale" },
];

export const ListingTypes: Record<PropertyType, OptionType[]> = {
	mieszkania: [
		{ value: "na sprzedaż", label: "Na sprzedaż" },
		{ value: "na wynajem", label: "Na wynajem" },
	],
	domy: [
		{ value: "na sprzedaż", label: "Na sprzedaż" },
		{ value: "na wynajem", label: "Na wynajem" },
	],
	działki: [{ value: "na sprzedaż", label: "Na sprzedaż" }],
	lokale: [
		{ value: "na sprzedaż", label: "Na sprzedaż" },
		{ value: "na wynajem", label: "Na wynajem" },
	],
};

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [propertyType, setPropertyType] = useState<PropertyType>("mieszkania");
	const [listingType, setListingType] = useState<ListingType>("na sprzedaż");
	const [searchCriteria, setSearchCriteria] = useState({
		location: "",
		minPrice: "",
		maxPrice: "",
		minArea: "",
		maxArea: "",
	});

	return (
		<SearchContext.Provider
			value={{
				searchCriteria,
				setSearchCriteria,
				propertyType,
				setPropertyType,
				listingType,
				setListingType,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearch = () => {
	const context = useContext(SearchContext);
	if (context === undefined) {
		throw new Error("useSearch must be used within a SearchProvider");
	}
	return context;
};
