import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
    email: string,
    name: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    comparePassword(candidatePassword: String): Promise<boolean>;
}


const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

UserSchema.pre("save", async function (next: mongoose.HookNextFunction) {
    let user = this as UserDocument

    //only has the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();

    const salt = await bcrypt.genSalt(config.get("SaltWorkFactor"));

    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();

})

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
}


const User = mongoose.model<UserDocument>("user", UserSchema);

export default User;