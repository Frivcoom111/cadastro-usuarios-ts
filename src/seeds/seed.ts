import AppDataSource from "../config/database";
import { User } from "../entities/users.entity";

const seed = async () => {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);

  const users = [
    {
      name: "Carlos",
      email: "carlos@email.com",
      password: "123456",
      age: 22,
      phone: "44920009157",
    },
    {
      name: "Ana",
      email: "ana@email.com",
      password: "123456",
      age: 25,
      phone: "44920009153",
    },
    {
      name: "Pedro",
      email: "pedro@email.com",
      password: "123456",
      age: 30,
      phone: "44920009154",
    },
  ];

  for (const userData of users) {
    const exists = await userRepo.findOne({
      where: {
        email: userData.email,
        phone: userData.phone,
      },
    });

    if (!exists) {
      const user = userRepo.create(userData);
      await userRepo.save(user);

      console.log(`✅ Usuário ${userData.name} criado`);
    } else {
      console.log(`⚠️ ${userData.name} já existe, pulando...`);
    }
  }

  AppDataSource.destroy();
  console.log("🌱 Seed finalizado!");
};

seed().catch(console.error);
