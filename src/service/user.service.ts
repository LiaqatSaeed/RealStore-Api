import omit from "lodash/omit";
import { DocumentDefinition } from "mongoose";
import User, { UserModel } from "../model/user.model";

export async function createUser(input: User) {
  return await UserModel.create(input);
}

export async function validatePassword({
  email,
  password,
}: {
  email: User["email"];
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
}
