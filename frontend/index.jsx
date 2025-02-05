import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavMenu } from "@shopify/app-bridge-react";
import { Card, EmptyState, Page } from "@shopify/polaris";
import { initI18n, PolarisProvider, ContextProvider } from "@/utilities";

function NotFound() {
	const { t } = useTranslation();

	return (
		<Page>
			<Card>
				<EmptyState heading={t("NotFound.heading")}>
					<p>{t("NotFound.description")}</p>
				</EmptyState>
			</Card>
		</Page>
	);
}

/**
 * File-based routing.
 * @desc File-based routing that uses React Router under the hood.
 * To create a new route create a new .jsx file in `/pages` with a default export.
 *
 * Some examples:
 * * `/pages/index.jsx` matches `/`
 * * `/pages/blog/[id].jsx` matches `/blog/123`
 * * `/pages/[...catchAll].jsx` matches any URL not explicitly matched
 *
 * @param {object} pages value of import.meta.glob(). See https://vitejs.dev/guide/features.html#glob-import
 *
 * @return {Routes} `<Routes/>` from React Router, with a `<Route/>` for each file in `pages`
 */
function useRoutes(pages) {
	const routes = Object.keys(pages)
		.map((key) => {
			let path = key
				.replace("./pages", "")
				.replace(/\.(t|j)sx?$/, "")
				/**
				 * Replace /index with /
				 */
				.replace(/\./g, "/")
				.replace(/\/index$/i, "/")
				/**
				 * Only lowercase the first letter. This allows the developer to use camelCase
				 * dynamic paths while ensuring their standard routes are normalized to lowercase.
				 */
				.replace(/\b[A-Z]/, (firstLetter) => firstLetter.toLowerCase())
				/**
				 * Convert /[handle].jsx and /[...handle].jsx to /:handle.jsx
				 */
				.replace(/\[(?:[.]{3})?(\w+?)\]/g, (_match, param) => `:${param}`);

			if (path.endsWith("/") && path !== "/") {
				path = path.substring(0, path.length - 1);
			}

			if (!pages[key].default) {
				console.warn(`${key} doesn't export a default React component`);
			}

			return {
				path,
				component: pages[key].default
			};
		})
		.filter((route) => route.component);

	return routes;
}

function App() {
	// Any .tsx or .jsx files in /pages will become a route
	// See documentation for <Routes /> for more info
	const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", { eager: true });
	const routes = useRoutes(pages);
	const { t } = useTranslation();

	return (
		<PolarisProvider>
			<ContextProvider>
				<BrowserRouter>
					<NavMenu>
						<Link to="/" rel="home"></Link>
						<Link to="/configurations">{t("NavigationMenu.configurations")}</Link>
						<Link to="/installations">{t("NavigationMenu.installations")}</Link>
						<Link to="/notifications">{t("NavigationMenu.notifications")}</Link>
						<Link to="/translations">{t("NavigationMenu.translations")}</Link>
						<Link to="/plans">{t("NavigationMenu.plans")}</Link>
					</NavMenu>
					<Routes>
						{routes.map(function (route) {
							const { path, component: Component } = route;
							return <Route key={path} path={path} element={<Component />} />;
						})}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</ContextProvider>
		</PolarisProvider>
	);
}

// Ensure that locales are loaded before rendering the app
initI18n().then(() => {
	const rootElement = document.getElementById("root");
	createRoot(rootElement).render(<App />);
});
