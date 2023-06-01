import { JWT } from "@/infrastructure/interfaces";
import { injectable } from "inversify";
import { JWTToken } from "./jwt.token";
import jsonwebtoken from "jsonwebtoken";

@injectable()
export class JSONWebToken implements JWT {
  constructor(private readonly secretKey: string) {}

  async sign(data: object): Promise<JWTToken> {
    try {
      const token = await jsonwebtoken.sign(data, this.secretKey);
      return new JWTToken(token, true);
    } catch (error: any) {
      return new JWTToken(error.toString(), false);
    }
  }

  async verify(token: JWTToken): Promise<any> {
    try {
      return await jsonwebtoken.verify(token.getToken(), this.secretKey);
    } catch (error: any) {
      return { error };
    }
  }
}
