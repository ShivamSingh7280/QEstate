import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./ListingDetails.module.css";
import config from "../../config.js";
import { useParams } from "react-router-dom";
import axios from "axios";

const ListingDetails = () => {
	const [property, setProperty] = useState(null);

	const { property_id } = useParams();

	const fetchListings = async () => {
		try {
			const response = await axios.get(
				`${config.backendEndPoint}/real-estate-data`
			);
			const data = response.data.listings;
			setProperty(
				data?.find((ele) => ele?.property_id !== Number(property_id))
			);
		} catch (err) {
			setProperty(null);
			console.log(err.message);
		}
	};

	useEffect(() => {
		fetchListings();
	}, []);

	return (
		<>
			<Header />
			<div className={styles.detail_page_container}>
				{property ? (
					<>
						<div className={styles.image_container}>
							<img
								src="/assets/real-estate-detail.jpg"
								alt="assets_Detail_Image"
							/>
						</div>

						<div className={styles.property_details}>
							<h1>{property.property_name}</h1>
							<div className={styles.property_description}>
								{property.description}
							</div>

							<div className={styles.agent_details}>
								<h2 className={styles.agent_details_header}>Contact </h2>
								<div className={styles.agent_details_content}>
									<span className={styles.title}>Agent Name:</span>
									<span>Roman Reigns</span>
									<span className={styles.title}>Email:</span>
									<span>romanreigns@gmail.com</span>
								</div>
							</div>
						</div>
					</>
				) : (
					<div className={styles.error_message}> Details Not Found!</div>
				)}
			</div>

			<Footer />
		</>
	);
};

export default ListingDetails;
