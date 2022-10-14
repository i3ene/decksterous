import { ServerConfig } from "./config/server.config";
import { Server } from "./server";

Server.Http.listen(ServerConfig.PORT, () => {
    console.log(`Server listening on port ${ServerConfig.PORT}`);
});