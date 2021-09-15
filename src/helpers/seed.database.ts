import { User, UserModel } from "../model/user.model";

export async function seedDatabase() {
  const defaultUser = new UserModel({
    email: "test@github.com",
    name: "MichalLytek",
    password: "s3cr3tp4ssw0rd",
  } as User);
  await defaultUser.save();

  return { defaultUser };
}
