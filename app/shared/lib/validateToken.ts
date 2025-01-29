import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export function validateToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    return decoded;
  } catch (err) {
    console.error("Token validation error:", err);
    return null;
  }
}
