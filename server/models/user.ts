import { injectable } from 'inversify';
import Ajv, { Schema } from "ajv"

import { IUser, User } from '../interfaces/models/IUser';
import { Model } from './model';
import { Condition, ObjectID } from 'mongodb';

export const UserSchema: Schema = {
    type: "object",
    properties: {
        _id: { type: "string" },
        email: { type: "string", minLength: 5, example: "giulio.cesare@email.com" },
        password: { type: "string", example: "mysecretpassword" },
        name: { type: "string", minLength: 4, example: "Giulio Cesare" }
    },
    required: ["email", "name"],
    additionalProperties: false,
}

@injectable()
export class UserModel extends Model<IUser> implements User {

    protected validator = new Ajv().addKeyword('example').compile(Object.assign({ required: ["password"] }, UserSchema));
    protected validatorUpdate = new Ajv().addKeyword('example').compile(UserSchema);
    protected collectionName = 'users';

    public async findByEmail(email: string): Promise<IUser | null> {
        return (await this.collection).findOne({ email });
    }

    public async findAll(): Promise<IUser[]> {
        return (await this.collection).find().project({ password: 0 }).toArray();
    }

    public async findOne(id: string): Promise<IUser | any> {
        const user = (await this.collection).findOne({ _id: new ObjectID(id) as Condition<string> });
        delete (await user).password;
        return user;
    }

    public validateUpdate(data: IUser) {
        const res = this.validatorUpdate(data);
        return res;
    }

}
