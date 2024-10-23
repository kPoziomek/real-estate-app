import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
	content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			keyframes: {
				"slide-in": {
					"0%": { transform: "translateY(-100%)" },
					"100%": { transform: "translateY(96px)" },
				},
				"slide-out": {
					"0%": { transform: "translateY(96px)" },
					"100%": { transform: "translateY(-100%)" },
				},
			},
			animation: {
				"slide-in": "slide-in 0.5s ease-in-out forwards",
				"slide-out": "slide-out 0.5s ease-in-out forwards",
			},
			fontFamily: {
				sans: [
					'"Inter"',
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"',
				],
			},
		},
		colors: {
			white: "#fefefe",
			transparent: "transparent",
			current: "currentColor",
			black: colors.black,
			rose: colors.rose,
			pink: colors.pink,
			fuchsia: colors.fuchsia,
			purple: colors.purple,
			violet: colors.violet,
			indigo: colors.indigo,
			blue: colors.blue,
			sky: colors.sky, // As of Tailwind CSS v2.2, `lightBlue` has been renamed to `sky`
			cyan: colors.cyan,
			teal: colors.teal,
			emerald: colors.emerald,
			green: colors.green,
			lime: colors.lime,
			yellow: colors.yellow,
			amber: colors.amber,
			orange: colors.orange,
			red: colors.red,
			slate: colors.slate,
			zinc: colors.zinc,
			gray: colors.gray,
			neutral: colors.slate,
			stone: colors.stone,
		},
	},

	plugins: [],
} satisfies Config;
