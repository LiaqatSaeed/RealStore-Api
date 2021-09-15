import { Resolver, Query, Arg, Mutation, InputType } from "type-graphql";
import User, { UserModel } from "../model/user.model";
import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "../utils/object-id.scalar";
import { Context } from "../app";
import { UserInput } from "./types/user.input";
/**
 * @description First we create the resolver class and annotate it with the @Resolver() decorator
 */

@Resolver((of) => User)
export class UserResolver {
  @Query(() => [User], { name: "getUsers" })
  async users(): Promise<User[]> {
    return await UserModel.find({});
  }

  @Query(() => User, { nullable: true, name: "getUser" })
  user(@Arg("_id") _id: string) {
    return UserModel.findById(_id);
  }

  @Mutation(() => User)
  async addRecipe(@Arg("user") userInput: UserInput): Promise<User> {
    const recipe = new UserModel({
      ...userInput,
    } as User);

    await recipe.save();
    return recipe;
  }
}
