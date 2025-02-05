import PropTypes from "prop-types";
import { useState, createContext, useContext, useEffect, useCallback } from "react";
import { requestHelper } from "@/helpers";

const AppContext = createContext();

export function ContextProvider({ children }) {
	const [state, setState] = useState({ user: {}, userModules: [], shop: {} });

	const fetchData = useCallback(async function () {
		// const [userResponse, userModuleResponse, shopResponse] = await Promise.all([
		// 	requestHelper.patch("/app-general/users"),
		// 	requestHelper.patch("/app-general/user-modules"),
		// 	requestHelper.post("/shopify/shops")
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
				}
				default: {
				}
			}

			setState(newState);
		},
		[state, setState]
	);

	return [selector, dispatch];
}
