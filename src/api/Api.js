export async function sendContactMessage(payload) {
	try {
		const endpoint = import.meta.env.VITE_CONTACT_API_URL;
		if (endpoint) {
			const response = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!response.ok) {
				return { ok: false, fallback: true };
			}
			return { ok: true };
		}
		return { ok: false, fallback: true };
	} catch (error) {
		return { ok: false, fallback: true, error: error.message };
	}
}
