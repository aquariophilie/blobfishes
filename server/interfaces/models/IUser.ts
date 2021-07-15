import { IModel } from "./IModel";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
}

export interface User extends IModel<IUser> {
    findByEmail(email: string): Promise<IUser | null>;
    validateUpdate(data: IUser): any;
}
