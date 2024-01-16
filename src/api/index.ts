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
  updateWord: (id: string) => `words/update-one/${id}`, //PUT

  getTodayWord: 'words/today-word', //GET
};

export class Api {
  constructor() {}

  getUrl(url: string) {
    return `${API_BASE_URL}/${url}`;
  }

  async get<ResponseContent>(url: string, params?: {}) {
    const headers = await this.getHeaders();
    console.log(headers)

    const searchParams = new URLSearchParams(params);
    const resp = await fetch(this.getUrl(`${url}${searchParams}`), {
      method: 'GET',
      headers,
    });

    const json = await resp.json();
    return json;
  }

  async post<ResponseContent>(url: string, body: {} = {}) {
    const headers = await this.getHeaders();
    console.log(headers)

    const resp = await fetch(this.getUrl(url), {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const json = await resp.json();

    return json;
  }

  async put<ResponseContent>(url: string, body: {} = {}) {
    const headers = await this.getHeaders();

    console.log({url, body});
    const resp = await fetch(this.getUrl(url), {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });
    const json = await resp.json();
    return json;
  }

  async delete<ResponseContent>(url: string, body: {} = {}) {
    const headers = await this.getHeaders();

    const resp = await fetch(this.getUrl(url), {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const json = await resp.json();
    return json;
  }

  async getHeaders() {
    const token = await AsyncStorage.getItem('token');

    return {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }
}
