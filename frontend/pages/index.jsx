import { Card, Page, Layout, TextContainer, Image, Link, Text } from "@shopify/polaris";
import { useTranslation, Trans } from "react-i18next";
import { trophyImage } from "../assets";

export default function Index() {
	const { t } = useTranslation();

	return (
		<Page title={t("HomePage.title")}>
			<Layout>
				<Layout.Section>
					<Card sectioned>
						<TextContainer spacing="loose">
							<Text as="h2" variant="headingMd">
								{t("HomePage.heading")}
							</Text>
							<p>
								<Trans
									i18nKey="HomePage.yourAppIsReadyToExplore"
									components={{
										PolarisLink: <Link url="https://polaris.shopify.com/" external />,
										AdminApiLink: <Link url="https://shopify.dev/api/admin-graphql" external />,
										AppBridgeLink: <Link url="https://shopify.dev/apps/tools/app-bridge" external />
									}}
								/>
							</p>
							<p>{t("HomePage.startPopulatingYourApp")}</p>
							<p>
								<Trans
									i18nKey="HomePage.learnMore"
									components={{
										ShopifyTutorialLink: (
											<Link
												url="https://shopify.dev/apps/getting-started/add-functionality"
												external
											/>
										)
									}}
								/>
							</p>
						</TextContainer>
						<div style={{ padding: "0 20px" }}>
							<Image source={trophyImage} alt={t("HomePage.trophyAltText")} width={120} />
						</div>
					</Card>
				</Layout.Section>
				<Layout.Section></Layout.Section>
			</Layout>
		</Page>
	);
}
