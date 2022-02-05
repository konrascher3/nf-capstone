import React from "react";
import Drawer from "../drawer/Drawer";
import Header from "../header";

const Layout = ({ children }) => {
	return (
		<>
			<Header />

			{/*Drawer component*/}
			<Drawer />
			<main>{children}</main>
		</>
	);
};

export default Layout;
