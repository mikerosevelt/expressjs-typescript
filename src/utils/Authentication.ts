import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Authentication {
  public static hash = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  }

  public static passwordCompare = async (text: string, encryptedText: string): Promise<Boolean> => {
    let result = await bcrypt.compare(text, encryptedText);
    return result;
  }

  public static generateToken = (id: number, username: string, password: string): String => {
    const secretKey: string = process.env.JWT_SECRET_KEY || "njir";
    const token: string = jwt.sign({ id, username, password }, secretKey);

    return token;
  }
}

export default Authentication;