import jwt, { SignOptions } from "jsonwebtoken";
import env from "../env";
import { NextFunction, Response, Request } from "express";

const i = "";
const s = "";
const a = "";

const optionsToken: SignOptions = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: "10h",
  algorithm: "PS512",
};

export const signJWT = async (payload: object) => {
  try {
    const privateKey = `${env.JWT_PRIVATE}`;
    return jwt.sign(payload, privateKey, optionsToken);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.headers["help-uses-token"] as string;

  if (!token) {
    return res.json({ status: "error", message: "No token provided." });
  }

  const publicKEY = env.JWT_PUBLIC;

  jwt.verify(token, publicKEY, optionsToken, (err, decoded) => {
    if (err) {
      return res.json({ status: "error", message: "Token unauthorized." });
    }
    if (decoded) {
      // @ts-ignore
      req.token = decoded;
    }
    next();
  });
};
