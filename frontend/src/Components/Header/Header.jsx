import React from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = ({ onPage }) => {
	const navigate = useNavigate();

	return (
		<div className={styles.header}>
			<div className={styles.logo} onClick={() => navigate("/")}>
				QEstate
			</div>

			{onPage === "home" ? (
				<div className={styles.nav_link} onClick={() => navigate("/listings")}>
					<span>Explore</span>
				</div>
			) : onPage === "explore" ? (
				<div className={styles.nav_link} onClick={() => navigate("/")}>
					<span>Featured Listings</span>
				</div>
			) : (
				<div className={styles.nav_list}>
					<div className={styles.nav_link} onClick={() => navigate("/")}>
						Featured
					</div>
					<div
						className={styles.nav_link}
						onClick={() => navigate("/listings")}>
						Explore
					</div>
				</div>
			)}
		</div>
	);
};

export default Header;
