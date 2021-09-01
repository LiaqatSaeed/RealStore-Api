import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateRequest from "./middleware/validateRequest";
import { createUserSchema, createUserSessionSchema } from "./schema/user.schema";
import { createUserSessionHandler } from "./controller/session.controller";

export default function (app: Express) {
    app.get("/api/status", (req: Request, res: Response) => res.sendStatus(200));


    //Register User

    app.post("/api/users", validateRequest(createUserSchema), createUserHandler)


    // Login
    app.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler)


    // Get User Sessions


    //Logout
}