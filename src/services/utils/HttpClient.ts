import axios, { AxiosRequestConfig } from 'axios';

class HttpClient {
  baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || import.meta.env.VITE_API_URL;
  }

  get(path: string, options?: AxiosRequestConfig) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
      signal: options?.signal,
    });
  }

  post(path: string, options?: AxiosRequestConfig) {
    return this.makeRequest(path, {
      method: 'POST',
      headers: options?.headers,
      data: options?.data,
    });
  }

  patch(path: string, options?: AxiosRequestConfig) {
    return this.makeRequest(path, {
      method: 'PATCH',
      headers: options?.headers,
      data: options?.data,
    });
  }

  delete(path: string, options?: AxiosRequestConfig) {
    return this.makeRequest(path, {
      method: 'DELETE',
      headers: options?.headers,
    });
  }

  async makeRequest(path: string, options?: AxiosRequestConfig) {
    return axios({ url: `${this.baseUrl}${path}`, ...options });
  }
}

export default HttpClient;
