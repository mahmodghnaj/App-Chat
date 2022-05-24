"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, pass) {
        const user = await this.usersService.foundByEmail(email);
        if (!user)
            return null;
        const isMachPassword = bcrypt.compareSync(pass, user.password);
        if (user && isMachPassword) {
            const { refreshToken, password } = user, result = __rest(user, ["refreshToken", "password"]);
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
        if (!user)
            return null;
        const { refreshToken, password } = user, res = __rest(user, ["refreshToken", "password"]);
        return res;
    }
    async refreshToken(id, rt) {
        const user = await this.usersService.foundById(id);
        if (user.refreshToken != rt) {
            throw new common_1.HttpException('Access Dene', 401);
        }
        const { refreshToken } = user, res = __rest(user, ["refreshToken"]);
        return await this.getToken(res);
    }
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
        await this.usersService.updateRefreshToken(payload._id, refreshToken);
        return {
            accessToken,
            refreshToken,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map