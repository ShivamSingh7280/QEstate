import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./FeaturedListing.module.css";
import config from "../../config";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	CircularProgress,
	Typography,
} from "@mui/material";

const FeaturedListing = () => {
	const [listingsData, setListingsData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	async function fetchListings() {
		try {
			setIsLoading(true);
			const response = await axios.get(
				`${config.backendEndPoint}/real-estate-data`
			);
			const data = response.data.listings;
			const cardsData = data.slice(0, 8);
			setIsLoading(false);
			setListingsData(cardsData);
		} catch (err) {
			setListingsData([]);
			setIsLoading(false);
			console.log(err);
		}
	}

	useEffect(() => {
		fetchListings();
	}, []);

	return (
		<Box sx={{ width: "100%" }}>
			{!isLoading ? (
				<Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
					{listingsData?.length ? (
						listingsData.map((each, index) => (
							<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
								<Card sx={{ maxWidth: 345 }}>
									<CardActionArea>
										<CardMedia
											component="img"
											height="140"
											image={`/assets/real-estate-${index}.jpg`}
											alt={each.property_name}
										/>
										<CardContent>
											<Typography
												gutterBottom
												variant="h5"
												component="div"
												className={styles.property_name}>
												{each.property_name.slice(0, 6)}
											</Typography>
										</CardContent>

										<CardActions>
											<div className={styles.listing_detail}>
												<span className={styles.property_price}>
													Rs {each.price}
												</span>
												<span className={styles.property_city}>
													{each.city.slice(0, 5)}
												</span>
											</div>
										</CardActions>
									</CardActionArea>
								</Card>
							</Grid>
						))
					) : (
						<Grid item>
							<div className={styles.error_message}>
								<p>No Featured listings Found!🙂</p>
							</div>
						</Grid>
					)}
				</Grid>
			) : (
				<Box sx={{ display: "flex" }} id={styles.loader}>
					<CircularProgress />
				</Box>
			)}
		</Box>
	);
};

export default FeaturedListing;
