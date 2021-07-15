import { compare, hash } from "bcrypt";
import createHttpError from "http-errors";
import { inject, injectable } from "inversify";
import jwt, { Algorithm } from 'jsonwebtoken'
import config from "../config";
import { AuthService } from "../interfaces/services/IAuth";

import { IUser, User } from "../interfaces/models/IUser";
import { TYPES } from "../types";

@injectable()
export class AuthServiceImpl implements AuthService {

    constructor(
        @inject(TYPES.User) private userModel: User
    ) {
    }

    public async signIn(email: string, password: string): Promise<{ user: IUser; token: string }> {
        const user = await this.userModel.findByEmail(email);
        if (!user) {
            throw Error('Invalid Credential');
        }
        const match = await compare(password, user.password);
        if (!match) {
            throw Error('Invalid Credential');
        }
        const token = jwt.sign({
            data: { email: user.email, name: user.name, _id: user._id }
        }, config.jwtSecret, {
            algorithm: config.jwtAlgorithm as Algorithm,
            expiresIn: config.jwtExpiresIn
        });
        delete user.password;
        return { user, token };
    }

    public async register(userData: IUser): Promise<{ user: IUser; token: string }> {
        if (!this.userModel.validate(userData)) {
            throw createHttpError(400, 'Not valid data', { details: this.userModel.validatorErrors });
        }
        userData.password = await hash(userData.password, 10);
        delete userData._id;
        const user = await this.userModel.insert(userData);
        const token = jwt.sign({
            data: { email: user.email, name: user.name, _id: user._id },
        }, config.jwtSecret, {
            algorithm: config.jwtAlgorithm as Algorithm,
            expiresIn: config.jwtExpiresIn
        });
        return { user, token };
    }
}
