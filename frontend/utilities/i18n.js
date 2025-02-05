import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ShopifyFormat from "@shopify/i18next-shopify";
import { DEFAULT_LOCALE as POLARIS_LOCALE, SUPPORTED_LOCALES as POLARIS_LOCALES } from "@shopify/polaris";

/**
 * The default locale for the app.
 */
const APP_LOCALE = "en";
const APP_LOCALES = ["en", "de", "fr"];
let _userLocale, _polarisTranslations;

async function initI18next() {
	return await i18next
		.use(initReactI18next)
		.use(ShopifyFormat)
		.use({
			type: "backend",
			init(_services, _backendOptions, _i18nextOptions) {
				/* use services and options */
			},
			read(language, space, callback) {
				const res = async (locale, _space) => {
					return (await import(`../locales/${locale}.json`)).default;
				};
				if (typeof res === "function") {
					// in case someone wants to customize the loading...
					if (res.length < 3) {
						// no callback
						try {
							const r = res(language, space);
							if (r && typeof r.then === "function") {
								// promise
								r.then((data) => callback(null, (data && data.default) || data)).catch(callback);
							} else {
								// sync
								callback(null, r);
							}
						} catch (err) {
							callback(err);
						}
						return;
					}
					// normal with callback
					res(language, space, callback);
					return;
				}
				callback(null, res && res[language] && res[language][space]);
			}
		})
		.init({
			debug: process.env.NODE_ENV === "development",
			lng: getUserLocale(),
			fallbackLng: APP_LOCALE,
			supportedLngs: APP_LOCALES,
			interpolation: {
				// React escapes values by default
				escapeValue: false
			},
			react: {
				// Wait for the locales to be loaded before rendering the app
				// instead of using a Suspense component
				useSuspense: false
			}
		});
}

async function fetchPolarisTranslations() {
	if (_polarisTranslations) {
		return _polarisTranslations;
	}
	const userLocale = getUserLocale();
	const polarisLocale = POLARIS_LOCALES.includes(userLocale) ? userLocale : POLARIS_LOCALE;
	_polarisTranslations = await loadPolarisTranslations(polarisLocale);
	return _polarisTranslations;
}

const POLARIS_LOCALE_DATA = {
	cs: () => import("@shopify/polaris/locales/cs.json"),
	da: () => import("@shopify/polaris/locales/da.json"),
	de: () => import("@shopify/polaris/locales/de.json"),
	en: () => import("@shopify/polaris/locales/en.json"),
	es: () => import("@shopify/polaris/locales/es.json"),
	fi: () => import("@shopify/polaris/locales/fi.json"),
	fr: () => import("@shopify/polaris/locales/fr.json"),
	it: () => import("@shopify/polaris/locales/it.json"),
	ja: () => import("@shopify/polaris/locales/ja.json"),
	ko: () => import("@shopify/polaris/locales/ko.json"),
	nb: () => import("@shopify/polaris/locales/nb.json"),
	nl: () => import("@shopify/polaris/locales/nl.json"),
	pl: () => import("@shopify/polaris/locales/pl.json"),
	"pt-BR": () => import("@shopify/polaris/locales/pt-BR.json"),
	"pt-PT": () => import("@shopify/polaris/locales/pt-PT.json"),
	sv: () => import("@shopify/polaris/locales/sv.json"),
	th: () => import("@shopify/polaris/locales/th.json"),
	tr: () => import("@shopify/polaris/locales/tr.json"),
	vi: () => import("@shopify/polaris/locales/vi.json"),
	"zh-CN": () => import("@shopify/polaris/locales/zh-CN.json"),
	"zh-TW": () => import("@shopify/polaris/locales/zh-TW.json")
};

async function loadPolarisTranslations(locale) {
	return (await POLARIS_LOCALE_DATA[locale]()).default;
}

function getUserLocale() {
	if (_userLocale) {
		return _userLocale;
	}
	const url = new URL(window.location.href);
	const locale = url.searchParams.get("locale") || APP_LOCALE;
	_userLocale = APP_LOCALES.includes(locale) ? locale : APP_LOCALE;
	return _userLocale;
}

export function getPolarisTranslations() {
	return _polarisTranslations;
}

export async function initI18n() {
	await Promise.all([initI18next(), fetchPolarisTranslations()]);
}
