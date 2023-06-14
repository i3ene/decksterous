import { AuthConfig } from "./auth.config";
import { DatabaseConfig } from "./database.config";
import { MailConfig } from "./mail.config";
import { ServerConfig } from "./server.config";
import { UserConfig } from "./user.config";

export namespace Config {
    export const Server = ServerConfig;
    export const Database = DatabaseConfig;
    export const Auth = AuthConfig;
    export const Mail = MailConfig;
    export const User = UserConfig;
}
