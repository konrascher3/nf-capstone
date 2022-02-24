import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel="manifest" href="/manifest.json" />
					<meta name="theme-color" content="#3a4464" />
					<meta charSet="utf-8" />
					<meta name="description" content="Track your favorite coins with coin ghost" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-status-bar-style" content="black" />
					<meta name="apple-mobile-web-app-title" content="coin ghost" />
					<meta name="format-detection" content="telephone=no" />
					<meta name="mobile-web-app-capable" content="yes" />
					<meta name="robots" content="noindex,nofollow" />
					<meta name="msapplication-tap-highlight" content="no" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
