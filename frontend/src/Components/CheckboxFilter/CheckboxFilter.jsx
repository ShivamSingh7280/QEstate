import React from "react";
import styles from "../Explore/Explore.module.css";

const locations = ["Sintra", "Amper", "Świnna", "Hanji"];
const priceRange = ["0-300000", "300001-600000", "600001-1000000"];

const CheckboxFilter = ({
	location_Filter,
	price_Range_Filter,
	handleLocationFilter,
	handlePriceRangeFilter,
}) => {
	return (
		<div className={styles.checkbox_filter_container}>
			{/* Location Based Filter  */}

			<div className={styles.filter}>
				<h2 className={styles.title}>Location</h2>
				{locations.map((location, index) => (
					<div key={index}>
						<label>
							<input
								type="checkbox"
								checked={location_Filter.includes(location)}
								value={location}
								onChange={handleLocationFilter}
							/>
							{location}
						</label>
					</div>
				))}
			</div>

			{/* Price Based Filter  */}

			<div className={styles.filter}>
				<h2 className={styles.title}>Price Range</h2>
				{priceRange.map((price, index) => (
					<div key={index}>
						<label>
							<input
								type="checkbox"
								checked={price_Range_Filter.includes(price)}
								value={price}
								onChange={handlePriceRangeFilter}
							/>
							{price}
						</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default CheckboxFilter;
