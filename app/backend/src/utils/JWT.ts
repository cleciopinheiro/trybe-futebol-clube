import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  email: string;
};

export default class JWT {
  static sign(payload: TokenPayload): string {
    return jwt.sign(payload, secret);
  }

  static verify(token: string) {
    return jwt.verify(token, secret);
  }
}
