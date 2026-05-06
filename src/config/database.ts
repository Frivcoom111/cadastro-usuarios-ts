import { DataSource } from "typeorm";
import { User } from "../entities/users.entity.js";

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    entities: [User]
})

export default AppDataSource;