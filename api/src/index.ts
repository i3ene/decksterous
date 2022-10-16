import { ServerConfig } from "./config/server.config";
import { db } from "./database";
import { Server } from "./server";

db.sync();

Server.Http.listen(ServerConfig.PORT, () => {
    console.log(`Server listening on port ${ServerConfig.PORT}`);
});