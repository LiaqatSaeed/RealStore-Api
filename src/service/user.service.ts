import { DocumentDefinition } from "mongoose"
import User, { UserDocument } from "../model/user.model";



export async function createUser(input: DocumentDefinition<UserDocument>) {
    try {
        return User.create(input)

    } catch (e: any) {
        throw new Error(e.message)
    }
}