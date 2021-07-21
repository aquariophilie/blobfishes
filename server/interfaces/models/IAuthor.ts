import { IModel } from "./IModel";

export interface IAuthor {
    _id: string;
    name: string;
    bio: string;
    birthday: Date;
}

export interface Author extends IModel<IAuthor> {

}
