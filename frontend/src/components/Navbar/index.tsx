import React from "react";
import { Navbar as BNavbar, Container } from "react-bootstrap";
import styles from "./styles.module.scss";

interface NavBarProps {}

const Navbar: React.FC<NavBarProps> = ({}) => {
	return (
		<BNavbar sticky="top" bg="dark" variant="dark">
			<Container>
				<BNavbar.Brand href="/">Nestor</BNavbar.Brand>
			</Container>
		</BNavbar>
	);
};

export { Navbar };
