import PropTypes from "prop-types";
import { useState, createContext, useContext, useEffect, useCallback } from "react";
// import { AgHelpers } from "@/helpers";

const AppContext = createContext();

const initialState = Object.freeze({
	appGeneral: {
		user: {},
		emails: [],
		exports: []
	},
	requestQuote: {
		rules: [],
		rule: {},
		button: {},
		form: {},
		orders: [],
		order: {},
		variants: [],
		addresses: [],
		logs: []
	},
	shopify: {
		shop: {},
		customers: [],
		customerTags: [],
		productTags: []
	}
});

export function ContextProvider({ children }) {
	const [state, setState] = useState(initialState);

	const fetchData = useCallback(async function () {
		// const [userResponse, userModuleResponse, shopResponse] = await Promise.all([
		// 	AgHelpers.request("/app-general/users"),
		// 	AgHelpers.request("/app-general/user-modules"),
		// 	AgHelpers.request("/shopify/shops")
		// ]);
		// setState({ user: userResponse.data[0], userModules: userModuleResponse.data, shop: shopResponse.data[0] });
	}, []);

	useEffect(function () {
		fetchData();
	}, []);

	return <AppContext.Provider value={[state, setState]}>{children}</AppContext.Provider>;
}

ContextProvider.propTypes = {
	children: PropTypes.node
};

export function useStore() {
	const [state, setState] = useContext(AppContext);

	const selector = useCallback(
		function (selectFunction) {
			return selectFunction(state);
		},
		[state]
	);

	const dispatch = useCallback(
		function (type, payload) {
			const newState = state.copy();

			switch (type) {
				case "UPDATE_USER_MODULES": {
					const dataMap = payload.reduce(function (accumulator, userModule) {
						accumulator[userModule.moduleId] = userModule;
						return accumulator;
					}, {});

					newState.userModules = newState.userModules.map(function (userModule) {
						const moduleId = userModule.moduleId;
						return Object.hasOwn(dataMap, moduleId) ? { ...userModule, ...dataMap[moduleId] } : userModule;
					});
					break;
				}
				default: {
					// do nothing
				}
			}

			setState(newState);
		},
		[state, setState]
	);

	return [selector, dispatch];
}
