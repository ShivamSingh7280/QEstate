import React, { useState } from "react";
import styles from "./EditModal.module.css";

const EditModal = ({ item, onSave, onClose }) => {
	const [editedItem, setEditedItem] = useState({ ...item });

	const _handleInputChange = (event) => {
		const { name, value } = event?.target;
		setEditedItem((prevState) => ({ ...prevState, [name]: value }));
	};

	const _handleSaveClick = () => {
		onSave(editedItem);
		onClose();
	};

	return (
		<div className={styles.modal}>
			<div className={styles.modal_content}>
				<h2>Edit Property</h2>
				<label>Property Name</label>
				<input
					type="text"
					name="property_name"
					value={editedItem.property_name}
					onChange={_handleInputChange}
				/>
				<label>Price</label>
				<input
					type="text"
					name="price"
					value={editedItem.price}
					onChange={_handleInputChange}
				/>
				<label>Address</label>
				<input
					type="text"
					name="address"
					value={editedItem.address}
					onChange={_handleInputChange}
				/>

				<div className={styles.modal_buttons}>
					<button className={styles.save_button} onClick={_handleSaveClick}>
						Save
					</button>
					<button className={styles.cancel_button} onClick={onClose}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditModal;
