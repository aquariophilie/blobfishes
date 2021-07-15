import { IUser } from "../models/IUser";

export interface AuthService {
    signIn(email: string, password: string): Promise<{ user: IUser; token: string }>;
    register(userData: IUser): Promise<{ user: IUser; token: string }>;
}
