// Simple HTTP client wrapper
class HttpClient {
  async get<T>(url: string): Promise<T> {
    console.log(`Fetching: ${url}`);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Request failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Response received:", data);

    return data;
  }
}

export const httpClient = new HttpClient();
