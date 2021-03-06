import config from "config";
import { Omit } from "lodash";
import get from "lodash/get";
import { LeanDocument, FilterQuery, UpdateQuery, ObjectId } from "mongoose";
import { findUser } from "../controller/user.controller";
import Session, { SessionModel } from "../model/session.model";
import User from "../model/user.model";
import { decode, sign } from "../urtils/jwt.utils";
import { DocumentType } from "@typegoose/typegoose";

export async function createSession(userId: ObjectId, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
}

export function createAccessToken({
  user,
  session,
}: {
  user: Omit<User, "password"> | LeanDocument<Omit<User, "password">>;
  session: Omit<Session, "password"> | LeanDocument<Omit<Session, "password">>;
}) {
  // Build and return new Access Token
  return sign(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } //15 minutes
  );
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  //Decode the refresh token
  const { decoded } = decode(refreshToken);

  if (!decoded || !get(decoded, "_id")) return false;

  //Get the session
  const session = await SessionModel.findById(get(decoded, "_id"));

  //Make sure the session is still valid
  if (!session || !session?.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = createAccessToken({ user, session });

  return accessToken;
}

export async function updateSession(
  query: FilterQuery<DocumentType<Session>>,
  update: UpdateQuery<DocumentType<Session>>
) {
  return SessionModel.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<DocumentType<Session>>) {
  return SessionModel.find(query).lean();
}
