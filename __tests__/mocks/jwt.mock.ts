import { JWTToken } from "../../src/infrastructure/auth/jwt.token";
import { JWT} from "../../src/infrastructure/interfaces"

export class MockJWT implements JWT {
    sign(data: object): Promise<JWTToken> {
      return Promise.resolve(new JWTToken("123", true));
    }
    verify(token: JWTToken): Promise<any> {
      throw new Error("Method not implemented.");
    }
  }
  