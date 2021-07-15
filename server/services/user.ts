import { hash } from "bcrypt";
import createHttpError from "http-errors";
import { inject, injectable } from "inversify";

import { IUser, User } from "../interfaces/models/IUser";
import { UserService } from "../interfaces/services/IUser";
import { TYPES } from "../types";

@injectable()
export class UserServiceImpl implements UserService {

    constructor(
        @inject(TYPES.User) private userModel: User
    ) {
    }

    async save(userData: IUser, authUser: IUser): Promise<IUser> {
        if (!this.userModel.validate(userData)) {
            throw createHttpError(400, 'Not valid data', { details: this.userModel.validatorErrors });
        }
        userData.password = await hash(userData.password, 10);
        delete userData._id;
        return this.userModel.insert(userData);
    }

    async update(id: string, userData: IUser, authUser: IUser): Promise<IUser> {
        const data = await this.userModel.findOne(id);
        if (!data) {
            throw createHttpError(404, 'Not found');
        }
        if (data._id !== authUser._id) {
            throw createHttpError(403, 'Forbidden, you don\'t have enough permissions');
        }
        if (!this.userModel.validateUpdate(userData)) {
            throw createHttpError(400, 'Not valid data', { details: this.userModel.validatorErrors });
        }
        if (userData.password && typeof userData.password === 'string') {
            userData.password = await hash(userData.password, 10);
        }
        delete userData.email;
        delete userData._id;
        return this.userModel.update(id, userData).then(res => userData);
    }

    async getOne(id: string, authUser: IUser): Promise<IUser> {
        const data = await this.userModel.findOne(id);
        if (!data) {
            throw createHttpError(404, 'Not found');
        }
        return data;
    }

    async deleteOne(id: string, authUser: IUser): Promise<any> {
        const data = await this.userModel.findOne(id);
        if (!data) {
            throw createHttpError(404, 'Not found');
        }
        if (data._id !== authUser._id) {
            throw createHttpError(403, 'Forbidden, you don\'t have enough permissions');
        }
        return this.userModel.deleteOne(id);
    }

    async list(authUser: IUser): Promise<IUser[]> {
        const data = await this.userModel.findAll();
        return data;
    }

}
