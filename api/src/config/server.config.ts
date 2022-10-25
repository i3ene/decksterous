import secret from "./secret.json";

export namespace ServerConfig {
    export const PORT = 3030;
    export const SECRET = secret.auth.secret;
}