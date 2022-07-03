import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email, pass) {
    const user = await this.usersService.foundByEmail(email);
    if (!user) return null;
    const isMachPassword = bcrypt.compareSync(pass, user.password);
    if (user && isMachPassword) {
      const { refreshToken, password, ...result } = user;
      return result;
    }
  }
  async register(body) {
    const user = await this.usersService.addUser(body);

    return await this.getToken(user);
  }
  async login(payload) {
    return await this.getToken(payload);
  }
  async me(id) {
    const user = await this.usersService.foundById(id);
    if (!user) return null;
    const { refreshToken, password, ...res } = user;
    return res;
  }
  async refreshToken(id, rt) {
    const user = await this.usersService.foundById(id);
    if (user.refreshToken != rt) {
      throw new HttpException('Access Dene', 401);
    }
    const { refreshToken, ...res } = user;
    return await this.getToken(res);
  }
  /////////////////////////
  async getToken(payload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.SECRET,
        expiresIn: 60 * 15,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: 60 * 60 * 24 * 360,
      }),
    ]);
    await this.usersService.updateUser(payload._id, {
      refreshToken: refreshToken,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
