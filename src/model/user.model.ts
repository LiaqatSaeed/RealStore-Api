import { ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { getModelForClass, prop, pre } from "@typegoose/typegoose";

@pre<User>("save", async function (next) {
  let user = this;

  //only has the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
})
export class User {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public password: string;

  public async comparePassword(candidatePassword: string) {
    const user = this;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
  }
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true, toJSON: { virtuals: true } },
});

export default User;
