import PropTypes from "prop-types";
import { useState, useCallback } from "react";
import { TextField, Icon, Box, IndexTable, InlineStack, Avatar, Text } from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";
import { Modal } from "./modal";

const allCustomers = [
	{ id: 1, name: "user1", email: "user1@commerce.com" },
	{ id: 2, name: "user2", email: "user2@commerce.com" },
	{ id: 3, name: "user3", email: "user3@commerce.com" }
];

export function CustomerPicker({ value = [], onChange = () => {} }) {
	const [modalOpen, setModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [customers, setCustomers] = useState(allCustomers);
	const [selectedCustomerIds, setSelectedCustomerIds] = useState(value);
	const [searchText, setSearchText] = useState("");
	const [searchLoading, setSearchLoading] = useState(false);
	const [searchTimeout, setSearchTimeout] = useState(setTimeout(() => {}, 0));
	const [searchedCustomers, setSearchedCustomers] = useState(customers);

	const handleSearchTextChange = useCallback(function (value) {
		setSearchText(value);
	}, []);

	const handleCustomerSelectionChange = useCallback(
		function (selectionType, toggleType, selection) {
			let newSelectedIds = [];

			if (selectionType === "single") {
				newSelectedIds = toggleType ? selectedCustomerIds.concat(selection) : selectedCustomerIds.filter((id) => id !== selection);
			} else if (selectionType === "page") {
				newSelectedIds = toggleType ? searchedCustomers.map((customer) => customer.id) : [];
			}

			setSelectedCustomerIds(newSelectedIds);
		},
		[searchedCustomers, selectedCustomerIds]
	);

	return (
		<>
			<TextField placeholder="Search customers" prefix={<Icon source={SearchIcon} />} onFocus={() => setModalOpen(true)} />
			<Modal
				open={modalOpen}
				title="Select customers"
				onClose={() => setModalOpen(false)}
				primaryAction={{ content: "Select", loading: loading, onAction: () => {} }}
				secondaryAction={{ content: "Cancel", loading: loading, onAction: () => setModalOpen(false) }}
			>
				<Box paddingBlock="200" paddingInline="300">
					<TextField
						placeholder="Search customers"
						prefix={<Icon source={SearchIcon} />}
						loading={searchLoading}
						value={searchText}
						onChange={handleSearchTextChange}
					/>
				</Box>
				<IndexTable
					resourceName={{ singular: "customer", plural: "customers" }}
					headings={[{ title: "" }, { title: "" }]}
					selectable={true}
					itemCount={customers.length}
					selectedItemsCount={selectedCustomerIds.length}
					onSelectionChange={handleCustomerSelectionChange}
				>
					{customers.map(function (customer, index) {
						const { id, name, email } = customer;

						return (
							<IndexTable.Row id={id} key={id} selected={selectedCustomerIds.includes(id)} position={index}>
								<IndexTable.Cell>
									<Avatar customer size="lg" name={name} />
								</IndexTable.Cell>
								<IndexTable.Cell>
									<Text as="div">{name}</Text>
									<Text as="div">{email}</Text>
								</IndexTable.Cell>
							</IndexTable.Row>
						);
					})}
				</IndexTable>
			</Modal>
		</>
	);
}

CustomerPicker.propTypes = {
	value: PropTypes.array,
	onChange: PropTypes.func
};
