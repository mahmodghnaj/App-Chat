import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: any, pass: any): Promise<{
        _id: any;
        __v?: any;
        id?: any;
        firstName: string;
        lastName: string;
        email: string;
    }>;
    register(body: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(payload: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    me(id: any): Promise<{
        _id: any;
        __v?: any;
        id?: any;
        firstName: string;
        lastName: string;
        email: string;
    }>;
    refreshToken(id: any, rt: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getToken(payload: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
