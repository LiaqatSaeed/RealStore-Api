import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "../logger";

/**
 * @param schema Pass Yup schema of your module
 * @returns If schema validated. Request will be passed on to next middleware.In case error. Error will be passed as a Response to user.
 */

const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {

        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        return next();

    } catch (e: any) {
        log.error(e)
        return res.status(400).send(e.errors);
    }
}

export default validate;