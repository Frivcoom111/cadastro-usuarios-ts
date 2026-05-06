import { DataSource } from "typeorm";
import { User } from "../entities/users.entity";

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    entities: [User]
})

export default AppDataSource;