import { useState, useCallback, useEffect } from "react";
import { Card, TextContainer, Text, Spinner } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { requestHelper } from "@/helpers";

export function ProductsCard() {
	const shopify = useAppBridge();
	const { t } = useTranslation();
	const [isPopulating, setIsPopulating] = useState(false);
	const [loading, setLoading] = useState(true);
	const [productCount, setProductCount] = useState(0);

	const fetchData = useCallback(async function () {
		const response = await requestHelper.patch("/products/count");
		setProductCount(response.count);
		setLoading(false);
	}, []);

	const setPopulating = (flag) => {
		shopify.loading(flag);
		setIsPopulating(flag);
	};

	const handlePopulate = async () => {
		setPopulating(true);
		const response = await requestHelper.post("/products");

		if (response.success) {
			const response = await requestHelper.patch("/products/count");
			setProductCount(response.count);
			shopify.toast.show(t("ProductsCard.productsCreatedToast", { count: response.count }));
		} else {
			shopify.toast.show(t("ProductsCard.errorCreatingProductsToast"), {
				isError: true
			});
		}

		setPopulating(false);
	};

	useEffect(function () {
		fetchData();
	}, []);

	return (
		<Card
			title={t("ProductsCard.title")}
			sectioned
			primaryFooterAction={{
				content: t("ProductsCard.populateProductsButton", {
					count: productCount
				}),
				onAction: handlePopulate,
				loading: isPopulating
			}}
		>
			<TextContainer spacing="loose">
				<p>{t("ProductsCard.description")}</p>
				<Text as="h4" variant="headingMd">
					{t("ProductsCard.totalProductsHeading")}
					<Text variant="bodyMd" as="p" fontWeight="semibold">
						{loading ? <Spinner size="small" /> : productCount}
					</Text>
				</Text>
			</TextContainer>
		</Card>
	);
}
