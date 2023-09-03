import { client } from "./client";
import type { Client } from "./client";

class AuthenticationService {
    constructor(private client: Client) {}

    login(username: string, password: string) {
        return client.sendPost("/auth/login", { username, password });
    }

    register(
        username: string,
        password: string,
        firstName: string,
        lastName: string
    ) {
        return client.sendPost("/auth/register", {
            username,
            password,
            firstName,
            lastName,
        });
    }
}

export const authenticationService = new AuthenticationService(client);
