import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { googleVerify } from './helpers/google-verify';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: any) {
    return { ok: true, message: 'Login local' };
  }

  async googleLogin(token: string) {
    const googleUser = await googleVerify(token);
    if (!googleUser)
      throw new UnauthorizedException('Token de Google no válido');

    const { email, name, img } = googleUser;
    let user = await this.userModel.findOne({ email });

    if (!user) {
      user = await this.userModel.create({
        name,
        email,
        password: '@@@',
        img,
        google: true,
        roles: ['user'],
      });
    } else {
      user.google = true;
      await user.save();
    }

    return {
      ok: true,
      user,
      token: this.jwtService.sign({ id: user._id }),
    };
  }

  async checkAuthStatus(user: User) {
    return {
      ok: true,
      user,
      token: this.jwtService.sign({ id: user._id }),
    };
  }
}
