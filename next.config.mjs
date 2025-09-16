/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		additionalData: `$var: red;`,
	},

	webpack(config) {
		// Elimina el manejo por defecto de .svg (si existe)
		const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
		if (fileLoaderRule) {
			fileLoaderRule.exclude = /\.svg$/i;
		}

		// Agrega el loader de SVGR
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
};

export default nextConfig;
