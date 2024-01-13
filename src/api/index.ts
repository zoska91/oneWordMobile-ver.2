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
};

export class Api {
  private token?: string | null;

  constructor(token?: string | null) {
    this.token = token;
  }

  getUrl(url: string) {
    return `${API_BASE_URL}/${url}`;
  }

  async get<ResponseContent>(url: string, params?: {}) {
    const searchParams = new URLSearchParams(params);
    const resp = await fetch(this.getUrl(`${url}${searchParams}`), {
      method: 'GET',
      headers: this.getHeaders(),
    });

    const json = await resp.json();
    return json;
  }

  async post<ResponseContent>(url: string, body?: {}) {
    console.log(url, body, this.getUrl(url));

    const resp = await fetch(this.getUrl(url), {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    console.log(4, resp);

    const json = await resp.json();
    console.log(5, json);

    return json;
  }

  async put<ResponseContent>(url: string, body?: {}) {
    const resp = await fetch(this.getUrl(url), {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    const json = await resp.json();
    return json;
  }

  async delete<ResponseContent>(url: string, body?: {}) {
    const resp = await fetch(this.getUrl(url), {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    const json = await resp.json();
    return json;
  }

  getHeaders() {
    return {
      ...headers,
      Authorization: `Bearer ${this.token}`,
    };
  }
}
