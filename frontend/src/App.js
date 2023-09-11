import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Explore from "./Components/Explore/Explore";
import ListingDetails from "./Components/ListingDetails/ListingDetails";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<LandingPage />} />

				<Route path="/listings" element={<Explore />} />

				<Route path="/detail/:property_id" element={<ListingDetails />} />
			</Routes>
		</div>
	);
}

export default App;
