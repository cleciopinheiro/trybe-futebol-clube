import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import LoginResponse from '../interfaces/IResponse';
import JWT from '../utils/JWT';

export default class LoginService {
  static async login(email: string, _password: string): Promise<LoginResponse> {
    const user = await UserModel.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(_password, user.password)) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }

    const token = JWT.sign({ email });

    return { status: 200, data: { token } };
  }

  static async loginValidate(email: string): Promise<LoginResponse> {
    const user = await UserModel.findOne({ where: { email } }) as UserModel;

    const { role } = user;
    return { status: 200, data: { role } };
  }
}
