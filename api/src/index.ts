import { Config } from "./config";
import { database } from "./database";
import { Server } from "./server";

database.sync();

Server.Http.listen(Config.Server.PORT, () => {
    console.log(`Server listening on port ${Config.Server.PORT}`);
});