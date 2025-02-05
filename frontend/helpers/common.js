export async function request(path = "", body = {}) {
	try {
		const headers = { "Content-Type": "application/json" };
		const options = { method: "POST", headers, body: JSON.stringify(body) };
		const response = await fetch("/api" + path, options);

		if (response.status === 200 && response.ok) {
			return await response.json();
		} else {
			return { success: false, message: "Fetch failed" };
		}
	} catch (error) {
		return { success: false, error, message: "Fetch failed" };
	}
}

export function formatMoney(value = 0, format = "") {
	return format.format({ value });
}
