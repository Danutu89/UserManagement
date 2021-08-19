import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import Home from "../pages/Home";
import "./styles.scss";

function App() {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
