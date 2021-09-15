import { ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { getModelForClass, prop, pre } from "@typegoose/typegoose";
import {
  ObjectType as GQLType,
  Field as GQLField,
  Resolver as GQLResolver,
} from "type-graphql";

@pre<User>("save", async function (next) {
  let user = this;

  //only has the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
})
@GQLType()
export class User {
  readonly _id: ObjectId;
  @GQLField()
  createdAt: Date;
  @GQLField()
  updatedAt: Date;

  @GQLField()
  @prop({ required: true, unique: true })
  public email: string;

  @GQLField()
  @prop({ required: true })
  public name: string;

  @GQLField()
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
