import { Request, Response } from 'express';
import Authentication from '../utils/Authentication';

const db = require("../db/models");

class AuthController {

  login = async (req: Request, res: Response): Promise<Response> => {
    // Get user data by username
    let { username, password } = req.body;

    const user = await db.user.findOne({ where: { username } });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found!' });
    }

    // Compare password
    let compare = await Authentication.passwordCompare(password, user.password);

    if (!compare) {
      return res.status(401).json({ success: false, msg: 'Wrong password!' });
    }

    const token = Authentication.generateToken(user.id, user.username, user.password);
    // Generate Token
    return res.status(200).json({ success: true, token });
  }

  register = async (req: Request, res: Response): Promise<Response> => {
    let { username, password } = req.body;

    const hashedPassword: string = await Authentication.hash(password);

    await db.user.create({ username, password: hashedPassword });

    return res.status(200).json({ success: true, msg: 'Registration success!' });
  }

  profile = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({ success: true, data: req.app.locals.credential });
  }

}

export default new AuthController;