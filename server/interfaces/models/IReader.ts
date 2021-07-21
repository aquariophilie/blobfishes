import { IModel } from "./IModel";

export interface IReader {
    _id: string;
    name: string,
    books_read: { id: string, title: string }[],
    now_reading: { id: string, title: string }[]
}

export interface Reader extends IModel<IReader> {

}
