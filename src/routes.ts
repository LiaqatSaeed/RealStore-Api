import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import { requiresUser, validateRequest } from "./middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionHandler,
} from "./controller/session.controller";

export default function (app: Express) {
  app.get("/api/status", (req: Request, res: Response) => res.sendStatus(200));

  //Register User

  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // Login
  app.post(
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // Get User Sessions
  app.get("/api/session", requiresUser, getUserSessionHandler);

  //Logout
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);
}
