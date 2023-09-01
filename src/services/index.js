import { AUTH_LS_KEY } from '../constants';
import { getStateFromLocalStorage } from '../utils';
​
class Client {
  BASE_URL = 'https://instagram.brightly-shining.cloud/api/v1';
​
  constructor() {
    this.token = getStateFromLocalStorage(AUTH_LS_KEY)?.token;
  }
​
  setToken(token) {
    this.token = token;
  }
​
  hasToken() {
    return !!this.token;
  }
​
  getOptions(method) {
    const headers = { 'Content-Type': 'application/json' };
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    return { method, headers };
  }
​
  getParams(parameters) {
    return '?' + new URLSearchParams(parameters);
  }
​
  getUrl(endpoint) {
    return this.BASE_URL + endpoint;
  }
​
  async sendRequest(endpoint, options, parameters = null) {
    if (parameters) endpoint += this.getParams(parameters);
    const response = await fetch(this.getUrl(endpoint), options);
    return await response.json();
  }
​
  async sendPost(endpoint, body = null) {
    const options = this.getOptions('POST');
    if (body) options.body = JSON.stringify(body);
    return await this.sendRequest(endpoint, options);
  }
​
  async sendDelete(endpoint, params = null) {
    return await this.sendRequest(endpoint, this.getOptions('DELETE'), params);
  }
​
  async sendGet(endpoint, params = null) {
    return await this.sendRequest(endpoint, this.getOptions('GET'), params);
  }
}
​
export const client = new Client();