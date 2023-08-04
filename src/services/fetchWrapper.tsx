import axios, { AxiosResponse } from "axios";

function handleResponse<T>(
  response: AxiosResponse<T>,
): Promise<AxiosResponse<T>> {
  if (response.status >= 400) {
    throw new Error(response.statusText);
  }
  if (!response.headers) {
    throw new Error("Headers not found in the response");
  }
  return Promise.resolve(response);
}

export const fetchWrapper = {
  get,
};

function get<T>(
  url: string,
  headers?: { headers: { Authorization: string } },
): Promise<AxiosResponse<T>> {
  const config = headers;
  return axios.get<T>(url, config).then(handleResponse);
}
