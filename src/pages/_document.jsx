import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel="manifest" href="/manifest.json" />
					{/*<link rel="apple-touch-icon" href="/icon.png" />*/}
					<meta name="theme-color" content="#3a4464" />
					<link rel="manifest" href="/manifest.json" />
					<meta charSet="utf-8" />
					<meta name="description" content="Track your favorite coins" />
					<meta name="application-name" content="coin ghost" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta
						name="apple-mobile-web-app-status-bar-style"
						content="black-translucent"
					/>
					<meta name="apple-mobile-web-app-title" content="coin ghost" />
					<meta name="format-detection" content="telephone=no" />
					<meta name="mobile-web-app-capable" content="yes" />
					<meta name="robots" content="noindex,nofollow" />
					<meta name="msapplication-tap-highlight" content="no" />
					{/*<meta name="theme-color" content={theme.palette.primary.main} />*/}
					{/*<link*/}
					{/*	rel="apple-touch-icon"*/}
					{/*	sizes="180x180"*/}
					{/*	href="/icons/apple-touch-icon.png"*/}
					{/*/>*/}
					{/*<link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />*/}
					{/*<link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />*/}
					<link rel="manifest" href="/manifest.json" />
					{/*<link rel="shortcut icon" href="/favicon.ico" />*/}
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
