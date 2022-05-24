import { CreateUserDto } from 'src/users/dto/create-user';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: CreateUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    me(re: any): Promise<{
        _id: any;
        __v?: any;
        id?: any;
        firstName: string;
        lastName: string;
        email: string;
    }>;
}
