const { heroui } = require('@heroui/react');

/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				lime: '#58CC02',
				'lime-light': '#89E219',
				ivory: '#F9F7F3',
				graphite: '#4B4B4B',
				'dark-green': '#1E454F',
			},
		},
	},
	darkMode: 'class',
	plugins: [heroui()],
};
