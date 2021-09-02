
import config from "config";
import { Request, Response } from "express";
import { createAccessToken, createSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { sign } from "../urtils/jwt.utils";
import get from "lodash/get"
import { updateSession, findSessions } from "../service/session.service";

export async function createUserSessionHandler(req: Request, res: Response) {
    try {
        const { body } = req;
        //validate the email and password
        const user = await validatePassword(body)

        if (!user) {
            return res.status(401).send("Invalid username or password")
        }

        //Create a session

        const session = await createSession(user._id, req.get("user-agent") || "")

        //create access token

        const accessToken = createAccessToken({ user, session })

        //create refresh token
        const refreshToken = sign(session, { expiresIn: config.get("refreshTtl") as string } //1 year
        )

        //send refresh and access token back

        res.send({ accessToken, refreshToken })
    } catch (e) {
        return res.status(409).send(e);
    }
}

export async function invalidateUserSessionHandler(req: Request, res: Response) {
    const sessionId = get(req, "User.session");
    await updateSession({ _id: sessionId }, { valid: false });
    return res.sendStatus(200)
}

export async function getUserSessionHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");

    const sessions = await findSessions({ user: userId, valid: true });

    return res.send(sessions)
}