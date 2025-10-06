import '../config.js'
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms';

const RAW_SECRET = process.env.JWT_SECRET;
if (!RAW_SECRET) throw new Error('JWT_SECRET non défini');
const SECRET: jwt.Secret = RAW_SECRET;

export interface AuthTokenPayload extends JwtPayload {
  sub: string;
  username: string;
  roles: string[];
}

export async function signJwt(
  payload: AuthTokenPayload,
  expiresIn: number | StringValue = '1h'
): Promise<string> {
  const options: SignOptions = {
    algorithm: 'HS256',
    expiresIn
  };
  return jwt.sign(payload, SECRET, options);
}

export function verifyJwt(token: string): AuthTokenPayload {
  const decoded = jwt.verify(token, SECRET);
  if (typeof decoded === 'string') {
    throw new Error('Invalid token payload');
  }
  const { sub, username, roles } = decoded as JwtPayload & Partial<AuthTokenPayload>;
  if (!sub || !username) throw new Error('Malformed token');
  return {
    sub,
    username,
    roles: Array.isArray(roles) ? roles as string[] : []
  };
}