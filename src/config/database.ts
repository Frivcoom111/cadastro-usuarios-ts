import { DataSource } from "typeorm";
import { User } from "../entities/users.entity";

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: false,
    entities: [User],
    migrations: ["src/migrations/*.ts"]
});

export default AppDataSource;