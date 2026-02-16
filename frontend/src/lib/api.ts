const API_URL = "http://127.0.0.1:8000/api/v1";

export async function analyzeImage(file: File, lat: number, lon: number) {
    const formData = new FormData();
    formData.append("file", file);

    // Append query params for lat/lon as the endpoint expects them as query params
    const url = `${API_URL}/analyze?lat=${lat}&lon=${lon}`;

    const response = await fetch(url, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Analysis failed");
    }

    return response.json();
}
