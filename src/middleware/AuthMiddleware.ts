import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, msg: "No token found!" });
  }

  let secretKey = process.env.JWT_SECRET_KEY || "njir";
  const token: string = req.headers.authorization.split(" ")[1];

  try {
    const credential: string | object = jwt.verify(token, secretKey);

    if (!credential) {
      return res.status(401).json({ success: false, msg: "Invalid token" });
    }

    req.app.locals.credential = credential;
    return next();
  } catch (error) {
    return res.send(error);
  }
};