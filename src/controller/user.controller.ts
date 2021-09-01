import { Request, Response } from "express";
import omit from "lodash/omit";
import { FilterQuery } from "mongoose";
import User, { UserDocument } from "../model/user.model";
import { createUser } from "../service/user.service";

export async function createUserHandler(req: Request, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), "password"))
    } catch (e) {
        return res.status(409).send(e);
    }
}

export async function findUser(query: FilterQuery<UserDocument>) {
    return User.findOne(query).lean()
}



