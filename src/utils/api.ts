import axios from "axios";

type Method = "GET" | "POST" ;


export const fetchApi = async (url: string, method: Method = 'GET', body?:any): Promise<any> => {
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
