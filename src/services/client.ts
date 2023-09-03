import { AUTH_LS_KEY } from "../constants";
import { getStateFromLocalStorage } from "../utils";

class Client {
    private BASE_URL = "https://instagram.brightly-shining.cloud/api/v1";
    private token: string = "";
    constructor() {
        this.token = getStateFromLocalStorage(AUTH_LS_KEY)?.token;
    }
    setToken(token: string) {
        this.token = token;
    }
    hasToken() {
        return !!this.token;
    }
    getOptions(method: string): any {
        const headers: { [key: string]: string } = {
            "Content-Type": "application/json",
        };
        if (this.token) headers["Authorization"] = `Bearer ${this.token}`;
        return { method, headers };
    }
    getParams(parameters: any) {
        return "?" + new URLSearchParams(parameters);
    }
    getUrl(endpoint: string) {
        return this.BASE_URL + endpoint;
    }
    async sendRequest(endpoint: string, options: any, parameters = null) {
        if (parameters) endpoint += this.getParams(parameters);
        const response = await fetch(this.getUrl(endpoint), options);
        return await response.json();
    }
    async sendPost(endpoint: string, body: any = null) {
        const options = this.getOptions("POST");
        if (body) options.body = JSON.stringify(body);
        return await this.sendRequest(endpoint, options);
    }
    async sendDelete(endpoint: string, params: any = null) {
        return await this.sendRequest(
            endpoint,
            this.getOptions("DELETE"),
            params
        );
    }
    async sendGet(endpoint: string, params = null) {
        return await this.sendRequest(endpoint, this.getOptions("GET"), params);
    }
}
export const client = new Client();
export type { Client };
