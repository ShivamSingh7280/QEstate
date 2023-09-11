import React, { useEffect, useState } from "react";
import styles from "./Explore.module.css";
import Header from "../Header/Header";
import config from "../../config";
import axios from "axios";
import CheckboxFilter from "../CheckboxFilter/CheckboxFilter";
import SortingFilter from "../SortingFilter/SortingFilter";
import ListingsTableView from "../ListingsTableView/ListingsTableView";
import Footer from "../Footer/Footer";

const Explore = () => {
	const [listingsData, setListingsData] = useState([]);
	const [locationFilter, setLocationFilter] = useState([]);
	const [priceRangeFilter, setPriceRangeFilter] = useState([]);
	const [sortByFilter, setSortByFilter] = useState("");

	async function fetchListings() {
		try {
			const response = await axios.get(
				`${config.backendEndPoint}/real-estate-data`
			);
			const data = response?.data?.listings;
			setListingsData(data);
		} catch (err) {
			setListingsData([]);
			console.log(err);
		}
	}

	const _handleLocationFilter = (event) => {
		const isChecked = event.target.checked;

		if (isChecked) {
			setLocationFilter((prevState) => [...prevState, event.target.value]);
		} else {
			setLocationFilter((prevState) =>
				prevState.filter((item) => item !== event.target.value)
			);
		}
	};

	const _handlePriceRangeFilter = (event) => {
		const isChecked = event.target.checked;

		if (isChecked) {
			setPriceRangeFilter((prevState) => [...prevState, event.target.value]);
		} else {
			setPriceRangeFilter((prevState) =>
				prevState.filter((item) => item !== event.target.value)
			);
		}
	};

	const _handleSortByFilter = (event) => {
		setSortByFilter(event.target.value);
	};

	useEffect(() => {
		fetchListings();
	}, []);

	return (
		<>
			<Header onPage="explore" />

			<div className={styles.property_listings_view}>
				<CheckboxFilter
					location_Filter={locationFilter}
					price_Range_Filter={priceRangeFilter}
					handleLocationFilter={_handleLocationFilter}
					handlePriceRangeFilter={_handlePriceRangeFilter}
				/>

				<SortingFilter
					sort_By_Filter={sortByFilter}
					handleSortByFilter={_handleSortByFilter}
				/>

				<ListingsTableView
					listings_Data={listingsData}
					location_Filter={locationFilter}
					price_Range_Filter={priceRangeFilter}
					sort_By_Filter={sortByFilter}
				/>
			</div>

			<Footer />
		</>
	);
};

export default Explore;
