import { Request, Response } from "express";
import omit from "lodash/omit";
import { FilterQuery } from "mongoose";
import User, { UserModel } from "../model/user.model";
import { createUser } from "../service/user.service";
import { DocumentType } from "@typegoose/typegoose";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (e: any) {
    return res.status(409).send({ error: e.message });
  }
}

export async function findUser(query: FilterQuery<DocumentType<User>>) {
  return UserModel.findOne(query).lean();
}
