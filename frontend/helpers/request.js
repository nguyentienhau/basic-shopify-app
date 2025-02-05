const headers = { "Content-Type": "application/json" };
const methods = ["PATCH", "POST", "DELETE"];
const names = ["get", "post", "delete"];

export default methods.reduce(function (accumulator, method, index) {
	accumulator[names[index]] = async function (path = "", body = []) {
		try {
			const options = { method, headers, body: JSON.stringify(body) };
			const response = await fetch("/api" + path, options);

			if (response.status === 200 && response.ok) {
				return await response.json();
			} else {
				return { success: false, message: "Fetch failed" };
			}
		} catch (error) {
			return { success: false, error, message: "Fetch failed" };
		}
	};
	return accumulator;
}, {});
