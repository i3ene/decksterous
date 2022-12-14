import { AuthConfig } from "./auth.config";
import { DatabaseConfig } from "./database.config";
import { ServerConfig } from "./server.config";

export namespace Config {
    export const Server = ServerConfig;
    export const Database = DatabaseConfig;
    export const Auth = AuthConfig
}
