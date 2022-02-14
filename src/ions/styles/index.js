import { css } from "@emotion/react";

export const globalStyle = css`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	html {
		font-size: 16px;
	}

	body {
		margin: 0;
		font-size: 1rem;
	}
`;

export const fonts = css`
	/* roboto-condensed-300 - latin */
	@font-face {
		font-family: "Roboto Condensed";
		font-style: normal;
		font-weight: 300;
		src: local(''),
		url('/fonts/Roboto_Condensed/roboto-condensed-v24-latin-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
		url('/fonts/Roboto_Condensed/roboto-condensed-v24-latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}

	/* roboto-condensed-regular - latin */
	@font-face {
		font-family: "Roboto Condensed";
		font-style: normal;
		font-weight: 400;
		src: local(''),
		url('/fonts/Roboto_Condensed/roboto-condensed-v24-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
		url('/fonts/Roboto_Condensed/roboto-condensed-v24-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}

	/* roboto-condensed-700 - latin */
	@font-face {
		font-family: "Roboto Condensed";
		font-style: normal;
		font-weight: 700;
		src: local(''),
		url('/fonts/Roboto_Condensed/roboto-condensed-v24-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
		url('/fonts/Roboto_Condensed/roboto-condensed-v24-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}

`
