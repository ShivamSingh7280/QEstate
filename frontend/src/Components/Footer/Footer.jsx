import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
	return (
		<div className={styles.footer_container}>
			<div className={styles.first_col}>
				<h1 className={styles.company_name}>QEstate</h1>
				<div className={styles.company_description}>
					We Are Where You Want to Live.
				</div>
			</div>
			<div className={styles.second_col}>
				<h2 className={styles.link_header}>Contact</h2>
				<ul className={styles.link_items}>
					<li>Bengaluru, India</li>
					<li>qestate@gmail.com</li>
					<li>+91 82971354191</li>
					<li>021895422485</li>
				</ul>
			</div>
		</div>
	);
};

export default Footer;
