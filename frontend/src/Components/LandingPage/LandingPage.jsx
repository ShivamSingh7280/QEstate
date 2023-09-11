import React from "react";
import styles from "./LandingPage.module.css";
import Header from "../Header/Header";
import HeroSection from "../HeroSection/HeroSection";
import FeaturedListing from "../FeaturedListing/FeaturedListing";
import Footer from "../Footer/Footer";

const LandingPage = () => {
	return (
		<div className={styles.landing_page_container}>
			<Header onPage="home" />

			<HeroSection />

			<div className={styles.card_container}>
				<h1 className={styles.featured_listings_title}>
					Here are some of our featured listings:
				</h1>

				<FeaturedListing />
			</div>

			<Footer />
		</div>
	);
};

export default LandingPage;
