import { NextFunction, Request, Response } from "express";
import get from "lodash/get";
import replace from "lodash/replace"
import { reIssueAccessToken } from "../service/session.service";
import { decode } from "../urtils/jwt.utils";

const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = replace(get(req, "header.authorization", ""), /^Bearer\s/, "");

    const refreshToken = get(req, "header.x-refresh");

    if (!accessToken) return next();

    const { decoded, expired } = decode(accessToken);

    if (decoded) {
        // @ts-ignore
        req.user = decoded;
        return next()
    }

    if (expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken({ refreshToken });

        if (newAccessToken) {
            res.setHeader("x-access-token", newAccessToken);

            const { decoded } = decode(newAccessToken);
            // @ts-ignore
            req.user = decoded;
        }

        return next();
    }
    return next();
};

export default deserializeUser;