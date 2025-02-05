import PropTypes from "prop-types";
import { useState, useCallback, useEffect, useMemo } from "react";
import { BlockStack, Box, InlineStack, Tag, Text, Icon, Autocomplete } from "@shopify/polaris";
import { SearchIcon, PlusCircleIcon } from "@shopify/polaris-icons";

const defaultProps = { type: "product", value: [], onChange: (value) => console.log(value), setData: (data) => console.log(data) };

export function TagPicker(props = defaultProps) {
	const { type, value, onChange } = { ...defaultProps, ...props };
	const [tags, setTags] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [searchedTags, setSearchedTags] = useState(tags);

	const handleSearchTextChange = useCallback(
		function (text) {
			const searchedTags = tags.filter((tag) => tag.toLowerCase().includes(text.trim().toLowerCase()));
			setSearchText(text);
			setSearchedTags(searchedTags);
		},
		[tags]
	);

	const handleTagAdd = useCallback(
		function (tag) {
			const newTags = tags.concat(tag);

			onChange(value.concat(tag));
			setTags(newTags);
			setSearchedTags(newTags);
			setSearchText("");
		},
		[value, onChange, tags]
	);

	const handleTagRemove = useCallback(
		function (tag) {
			const newValue = value.filter((item) => item !== tag);
			onChange(newValue);
		},
		[value, onChange]
	);

	useEffect(
		function () {
			if (type === "product") {
			} else if (type === "customer") {
			}
		},
		[type]
	);

	const options = useMemo(
		function () {
			return searchedTags.map(function (tag) {
				return { label: tag, value: tag };
			});
		},
		[searchedTags]
	);

	return (
		<BlockStack gap="200">
			<Autocomplete
				actionBefore={{
					content: (
						<Text as="span" variant="headingSm">
							Add
						</Text>
					),
					helpText: searchText,
					icon: PlusCircleIcon,
					badge: { tone: "new", content: "New!" },
					disabled: searchText.trim() === "" || tags.includes(searchText.trim()),
					onAction: () => handleTagAdd(searchText.trim())
				}}
				allowMultiple
				listTitle="Suggested tags"
				options={options}
				selected={value}
				onSelect={onChange}
				textField={
					<Autocomplete.TextField
						placeholder="Search tags"
						prefix={<Icon source={SearchIcon} />}
						value={searchText}
						onChange={handleSearchTextChange}
					/>
				}
			/>
			<InlineStack blockAlign="center" gap="200">
				{value.map(function (tag) {
					const removeTag = () => handleTagRemove(tag);
					return (
						<Tag onRemove={removeTag} key={tag}>
							<Box padding="100">
								<Text as="span" variant="bodyMd">
									{tag}
								</Text>
							</Box>
						</Tag>
					);
				})}
			</InlineStack>
		</BlockStack>
	);
}

TagPicker.propTypes = {
	type: PropTypes.oneOf(["product", "customer"]),
	value: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func,
	setData: PropTypes.func
};
