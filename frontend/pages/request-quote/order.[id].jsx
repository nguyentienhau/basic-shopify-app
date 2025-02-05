import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppBridge } from "@shopify/app-bridge-react";
import { requestHelper } from "@/helpers";
import { RequestQuoteOrder, RequestQuoteAddress } from "@/constants";

const moduleId = 0;
const backPath = "/request-quote";
const orderPath = "/request-quote/order";
const orderSample = RequestQuoteOrder.copy();
const shippingAddressSample = RequestQuoteAddress.copy();
const billingAddressSample = RequestQuoteAddress.copy();
shippingAddressSample.type = "shipping";
billingAddressSample.type = "billing";

export default function Order() {
	const navigate = useNavigate();
	const shopify = useAppBridge();
	const { id } = useParams();
	const [order, setOrder] = useState(orderSample);

	const handleAttributeChange = useCallback(
		function (key, value) {
			const newOrder = order.copy();
			newOrder[key] = value;
			setOrder(newOrder);
		},
		[order]
	);

	const fetchData = useCallback(async function (id) {
		const response = await requestHelper.get(orderPath, [{ id }]);

		if (response.success && response.data.length === 1) {
			setOrder(response.data[0]);
		}
	}, []);

	const handleSave = useCallback(
		async function () {
			const response = await requestHelper.post(orderPath, order);

			if (response.success && response.data.length === 1 && id === "add") {
				navigate(orderPath + "/" + response.data[0].id);
			}

			shopify.toast.show(response.message, { duration: 2000 });
		},
		[order, variants, shippingAddress, billingAddress]
	);

	const handleDelete = useCallback(
		async function () {
			const response = await requestHelper.delete(orderPath, [{ id }]);

			if (response.success && response.data.length === 1) {
				navigate(backPath);
			}

			shopify.toast.show(response.message, { duration: 2000 });
		},
		[id]
	);

	useEffect(
		function () {
			if (id !== "add") {
				const orderId = Number(id);
				id.length > 0 && orderId ? fetchData(orderId) : navigate(backPath);
			}
		},
		[id]
	);

	return (
		<Page title={id === "add" ? "Add Quote" : "Edit Quote #" + id}>
			<Layout>
				<Layout.Section>
					<OrderVariant value={order.variants} onChange={(value) => handleAttributeChange("variants", value)} />
					<Card></Card>
				</Layout.Section>
				<Layout.Section variant="oneThird">
					<OrderCustomer value={order.customerId} onChange={(value) => handleAttributeChange("customerId", value)} />
					<OrderAddress value={order.addresses} onChange={(value) => handleAttributeChange("addresses", value)} />
				</Layout.Section>
			</Layout>
		</Page>
	);
}
