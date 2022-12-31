import { MD5 } from "crypto-js";

export function HashPassword(password: string) {
  return MD5(password).toString();
}
