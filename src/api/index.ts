export const API_BASE_URL = `https://one-word-server.vercel.app/api/`;

const headers = { 'Content-Type': 'application/json' };

export const apiUrls = {
  login: 'auth/login',
  signup: 'auth/register',
  user: 'auth/user',
};

export class Api {
  constructor() {}

  getUrl(url: string) {
    return `${API_BASE_URL}/${url}`;
  }

  async get<ResponseContent>(url: string, params?: {}) {
    const resp = await fetch(this.getUrl(url), params);
    const json = resp.json();
    return json;
  }

  async post<ResponseContent>(url: string, body?: {}) {
    const resp = await fetch(this.getUrl(url), {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    const json = resp.json();
    return json;
  }

  async put<ResponseContent>(url: string, body?: {}) {
    const resp = await fetch(this.getUrl(url), {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    const json = resp.json();
    return json;
  }

  async delete<ResponseContent>(url: string, body?: {}) {
    const resp = await fetch(this.getUrl(url), {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const json = resp.json();
    return json;
  }
}
