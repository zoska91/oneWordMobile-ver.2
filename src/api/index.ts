import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE_URL = `https://one-word-server.vercel.app/api`;

const headers = {
  Accept: 'application.json',
  'Content-Type': 'application/json',
};

export const apiUrls = {
  // auth
  login: 'auth/login',
  signup: 'auth/register',
  user: 'auth/user',

  // settings
  getUserSettings: 'settings/user-settings', // GET
  updateUserSettings: 'settings/user-settings', //PUT

  // words
  getAllWords: 'words/all', //GET
  addWord: 'words/add-one', //POST
  sendCsv: 'words/add-csv', //POST
  updateWord: (id: string) => `words/update-one/${id}`, //PUT
  deleteWord: (id: string) => `words/delete-one/${id}`, // DELETE

  getTodayWord: 'words/today-word', //GET
};

export class Api {
  constructor() {}

  getUrl(url: string) {
    return `${API_BASE_URL}/${url}`;
  }

  async get<ResponseContent>(url: string, params?: {}) {
    const headers = await this.getHeaders();

    const searchParams = new URLSearchParams(params);
    const resp = await fetch(this.getUrl(`${url}${searchParams}`), {
      method: 'GET',
      headers,
    });

    const json = await resp.json();
    return json;
  }

  async post<ResponseContent>(url: string, body: Record<string, unknown> | FormData = {}) {
    const headers = await this.getHeaders();

    let fetchBody;

    if (typeof body === 'object' && !(body instanceof FormData)) {
      fetchBody = JSON.stringify(body);
    } else {
      fetchBody = body;
    }

    const resp = await fetch(this.getUrl(url), {
      method: 'POST',
      headers,
      body: fetchBody,
    });

    const json = await resp.json();

    return json;
  }

  async put<ResponseContent>(url: string, body: {} = {}) {
    console.log({ body });

    const headers = await this.getHeaders();

    const resp = await fetch(this.getUrl(url), {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });
    console.log(resp);

    const json = await resp.json();
    console.log({ json });

    return json;
  }

  async delete<ResponseContent>(url: string) {
    const headers = await this.getHeaders();

    const resp = await fetch(this.getUrl(url), {
      method: 'DELETE',
      headers,
    });

    const json = await resp.json();
    return json;
  }

  async getHeaders(isForm?: boolean) {
    const token = await AsyncStorage.getItem('token');

    if (!token) return headers;
    const formHeader = isForm ? { 'Content-Type': 'multipart/form-data' } : {};
    return {
      ...headers,
      Authorization: `Bearer ${token}`,
      ...formHeader,
    };
  }
}
