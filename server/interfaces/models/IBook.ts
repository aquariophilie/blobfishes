import { ObjectID } from "bson";
import { IModel } from "./IModel";

export interface IBook {
    _id: string;
    title: string;
    authors: string[] | ObjectID[];
    genres: string[];
    location: string;
    owner: string;
    reading: string[];
}

export interface Book extends IModel<IBook> {

}
