import React, { useEffect, useState } from "react";
import styles from "./ListingsTableView.module.css";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import EditModal from "../Modal/EditModal";
import style from "../Explore/Explore.module.css";
import { useNavigate } from "react-router-dom";

const ListingsTableView = ({
	listings_Data,
	location_Filter,
	price_Range_Filter,
	sort_By_Filter,
}) => {
	const navigate = useNavigate();

	// STATES :

	const [currentPage, setCurrentPage] = useState(1);
	const [filteredData, setFilteredData] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);
	const [editingItem, setEditingItem] = useState(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	// VARIABLES :

	let itemsPerPage = 10;
	let displayData = applyFilters(
		filteredData,
		location_Filter,
		price_Range_Filter,
		sort_By_Filter
	);

	const totalPages = Math.ceil(displayData.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const isAllSelected = selectedRows.length === itemsPerPage;

	// Filters :
	function applyFilters(filteredData, location, priceRange, sortBy) {
		let updatedData = [...filteredData];

		// Location Filter :

		if (location?.length) {
			updatedData = updatedData.filter((listing) =>
				location.includes(listing.city)
			);
		}

		// PriceRange Filter :

		if (priceRange?.length) {
			updatedData = updatedData.filter((listing) => {
				let found = false;
				priceRange.forEach((rangeEntry) => {
					let low = rangeEntry?.split("-")[0];
					let high = rangeEntry?.split("-")[1];

					if (
						Number(
							listing?.price >= Number(low) &&
								Number(listing?.price) <= Number(high)
						)
					) {
						found = true;
					}
				});
				return found;
			});
		}

		// SortBy Filter :

		if (sortBy === "price") {
			updatedData.sort(
				(firstListing, secondListing) =>
					firstListing?.price - secondListing?.price
			);
		} else if (sortBy === "date") {
			updatedData.sort(
				(firstListing, secondListing) =>
					new Date(firstListing?.listing_date) -
					new Date(secondListing?.listing_date)
			);
		}
		return updatedData;
	}

	//Checkbox handlers.

	const _handleRowSelected = (event, id) => {
		const isChecked = event?.target?.checked;

		if (isChecked) {
			// If the items are checked push it into the selectedRows state.

			setSelectedRows([...selectedRows, id]);
		} else {
			// If the items are not selected then remove it from the selectedRows.

			setSelectedRows(selectedRows.filter((item) => item !== id));
		}
	};

	const _handleSelectAll = (event, displayData) => {
		const isAllChecked = event.target.checked;

		if (isAllChecked) {
			const startIndex = (currentPage - 1) * itemsPerPage;

			let rowSelected = [];
			for (let i = startIndex; i < startIndex + itemsPerPage; i++) {
				if (i < displayData.length) {
					rowSelected.push(displayData[i].property_id);
				} else {
					rowSelected.push(Math.random());
				}
			}
			setSelectedRows(rowSelected);
		} else {
			setSelectedRows([]);
		}
	};

	// Editing Handlers.

	const _handleEdit = (item) => {
		setEditingItem(item);
		setIsEditModalOpen(true);
	};

	const _handleEditSave = (editedItem) => {
		const updatedData = [...filteredData];

		const editedIndex = updatedData.findIndex(
			(item) => item.property_id === editedItem.property_id
		);

		if (editedIndex !== -1) {
			updatedData[editedIndex] = editedItem;
			setFilteredData(updatedData);
		}
		setEditingItem(null);
	};

	const _handleCloseEditModal = () => {
		setIsEditModalOpen(false);
		setEditingItem(null);
	};

	// Delete Handlers.

	//Delete button(row)
	const _handleRowDelete = (id) => {
		const updatedData = filteredData?.filter((ele) => ele?.property_id !== id);

		const updatedTotalPages = Math.ceil(updatedData?.length / itemsPerPage);

		if (currentPage > updatedTotalPages) {
			setCurrentPage(updatedTotalPages);
		}

		setFilteredData(updatedData);
		setSelectedRows([]);
	};

	//Delete Selected Button.
	const _handleDeleteSelected = () => {
		if (selectedRows?.length === 0) {
			//Add toaster here.
			return;
		}

		const updatedData = filteredData?.filter(
			(ele) => !selectedRows?.includes(ele.property_id)
		);

		const updatedTotalPages = Math.ceil(updatedData?.length / itemsPerPage);

		if (currentPage > updatedTotalPages) {
			setCurrentPage(updatedTotalPages);
		}
		setFilteredData(updatedData);
		setSelectedRows([]);
	};

	//Pagination(number of buttons).
	const getPageNumbers = (totalPages) => {
		const pageNumbers = [];
		for (let currPage = 1; currPage <= totalPages; currPage++) {
			pageNumbers.push(currPage);
		}
		return pageNumbers;
	};

	const pageNumbers = getPageNumbers(totalPages);

	// Pagination Handler.

	const _handleFirstPage = () => {
		setCurrentPage(1);
		setSelectedRows([]);
	};

	const _handleLastPage = () => {
		setCurrentPage(totalPages);
		setSelectedRows([]);
	};

	const _handleNextPage = () => {
		setCurrentPage(currentPage + 1);

		setSelectedRows([]);
	};

	const _handlePreviousPage = () => {
		setCurrentPage(currentPage - 1);
		setSelectedRows([]);
	};

	const _handlePageClick = (page) => {
		setCurrentPage(page);
		setSelectedRows([]);
	};

	useEffect(() => {
		setFilteredData(listings_Data);
	}, [listings_Data]);

	useEffect(() => {
		setCurrentPage(1);
		setSelectedRows([]);
	}, [location_Filter, price_Range_Filter]);

	return (
		<div className={style.listings_Table_Container}>
			{/* TABLE  */}
			<table>
				<thead>
					<tr>
						<th>
							<input
								type="checkbox"
								checked={isAllSelected}
								onChange={(event) => _handleSelectAll(event, displayData)}
							/>
						</th>
						<th>Property Name</th>
						<th>Price</th>
						<th>Address</th>
						<th>Listing Date</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					{displayData?.slice(startIndex, endIndex)?.map((each, index) => (
						<tr className={`styles.table_row`} key={index}>
							<td>
								<input
									type="checkbox"
									checked={selectedRows.includes(each.property_id)}
									onChange={(event) =>
										_handleRowSelected(event, each.property_id)
									}
								/>
							</td>
							<td
								className={styles.property_name}
								onClick={() => navigate(`/detail/${each?.property_id}`)}>
								{each?.property_name}
							</td>

							<td>Rs.{each?.price}</td>
							<td>{each?.address}</td>
							<td>{each?.listing_date}</td>
							<td className={styles.action_items}>
								<RiDeleteBin4Fill
									onClick={() => _handleRowDelete(each?.property_id)}
									id={styles.deleteIcon}
								/>
								<BiSolidEdit
									onClick={() => _handleEdit(each)}
									id={styles.editIcon}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* TABLE FOOTER  */}

			<div className={styles.table_footer}>
				<button
					className={styles.deleteSelectedBtn}
					onClick={_handleDeleteSelected}
					disabled={selectedRows.length === 0}>
					Delete Selected
				</button>

				<div className={styles.pagination_container}>
					<span>
						Page {totalPages < 1 ? 0 : currentPage} of {totalPages}
					</span>

					<div className={styles.pagination}>
						<button onClick={_handleFirstPage} disabled={currentPage === 1}>
							First
						</button>
						<button onClick={_handlePreviousPage} disabled={currentPage === 1}>
							Previous
						</button>

						{/* Map  */}

						{pageNumbers.map((page, index) => (
							<button key={index} onClick={() => _handlePageClick(page)}>
								{page}
							</button>
						))}

						<button
							onClick={_handleNextPage}
							disabled={currentPage === totalPages}>
							Next
						</button>
						<button
							onClick={_handleLastPage}
							disabled={currentPage === totalPages}>
							Last
						</button>
					</div>
				</div>
			</div>

			{isEditModalOpen && (
				<EditModal
					item={editingItem}
					onSave={_handleEditSave}
					onClose={_handleCloseEditModal}
				/>
			)}
		</div>
	);
};

export default ListingsTableView;
