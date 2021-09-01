import { object, string, ref } from "yup";

export const createUserSchema = Object({
    body: Object({
        name: string().required("Name is required"),
        password: string()
            .required("Password is required")
            .min(6, "Password is too short - should be 6 chars minimum.")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
        confirm_password: string().oneOf(
            [ref("password"), null],
            "Password must match"
        ),
        email: string()
            .email("Must be a valid email")
            .required("Email is required"),
    }),
});


export const createUserSessionSchema = Object({
    body: Object({
        name: string().required("Name is required"),
        password: string()
            .required("Password is required")
            .min(6, "Password is too short - should be 6 chars minimum.")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
        confirm_password: string().oneOf(
            [ref("password"), null],
            "Password must match"
        ),
        email: string()
            .email("Must be a valid email")
            .required("Email is required"),
    }),
});
