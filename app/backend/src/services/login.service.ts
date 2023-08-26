import UserModel from '../database/models/user.model';
import LoginResponse from '../interfaces/LoginResponse';
// import IToken from '../interfaces/IToken';
import JWT from '../utils/JWT';

export default class LoginService {
  static async login(email: string, _password: string): Promise<LoginResponse | undefined> {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) return undefined;

    const token = JWT.sign({ email });

    return { token };
  }
}
