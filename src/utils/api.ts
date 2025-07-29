import axios from "axios";

type Method = "GET" | "POST" ;

export const fetchApi = async <T = unknown>(url: string, method: Method = 'GET', body?: unknown): Promise<T> => {
  try {
    const response = await axios({
      url,
      method,
      data: method !== "GET" ? body : undefined,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    console.error("Request failed:", err);
    throw err;
  }
};
