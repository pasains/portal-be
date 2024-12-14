import { login } from "../repository/authentication";
import { sign } from "jsonwebtoken";

// return user with jwt token
export const loginService = async (email: string, password: string) => {
  const user = await login(email, password);
  const token = sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    "secret", // iki kudu diganti nang .env ben secure, diganti sing angel
    {
      expiresIn: "24h",
    },
  );
  return { user, token };
};
