import { ObjectId } from "mongoose";
import { prop, getModelForClass } from "@typegoose/typegoose";
import User from "./user.model";

export class Session {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;

  @prop()
  user: User["_id"];

  @prop()
  valid: boolean;

  @prop()
  userAgent: string;
}

export const SessionModel = getModelForClass(Session, {
  schemaOptions: { timestamps: true, toJSON: { virtuals: true } },
});

export default Session;
