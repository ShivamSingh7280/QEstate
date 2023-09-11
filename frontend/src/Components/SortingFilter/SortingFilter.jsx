import { Box, FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import styles from "../Explore/Explore.module.css";

const options = ["none", "price", "date"];

const SortingFilter = ({ sort_By_Filter, handleSortByFilter }) => {
	return (
		<div className={styles.sorting_filter_container}>
			<h2 className={styles.title}>Sort By: </h2>
			<Box>
				<FormControl
					sx={{ m: 1 }}
					className={styles.inputSortingFilter}
					size="small">
					<Select
						value={sort_By_Filter}
						onChange={handleSortByFilter}
						displayEmpty
						inputProps={{ "aria-label": "Without label" }}>
						{options.map((option, index) => (
							<MenuItem key={index} value={option}>
								{option && option[0].toUpperCase() + option.slice(1)}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
		</div>
	);
};

export default SortingFilter;
