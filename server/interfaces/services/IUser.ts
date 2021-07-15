import { IUser } from "../models/IUser";

export interface UserService {
    save(userData: IUser, authUser: IUser): Promise<IUser>;
    update(id: string, userData: IUser, authUser: IUser): Promise<IUser>;
    getOne(id: string, authUser: IUser): Promise<IUser>;
    deleteOne(id: string, authUser: IUser): Promise<any>;
    list(authUser: IUser): Promise<IUser[]>;
}
