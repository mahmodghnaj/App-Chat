import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(email: any, password: any): Promise<{
        _id: any;
        __v?: any;
        id?: any;
        firstName: string;
        lastName: string;
        email: string;
    }>;
}
export {};
