import { InputType, Field } from "type-graphql";
import User from "../../model/user.model";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;
}
