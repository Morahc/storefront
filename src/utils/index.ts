import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface payload {
  id: number;
}

interface decoded {
  id: number;
  iat: number;
}

export const generateToken = (payload: payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string);
};

export const verifyToken = (token: string)=> {
  return jwt.verify(token, process.env.JWT_SECRET as Secret) as decoded;
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
