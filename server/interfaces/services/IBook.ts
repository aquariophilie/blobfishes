import { IBook } from "../models/IBook";

export interface BookService {
    save(bookData: IBook): Promise<IBook>;
    update(id: string, bookData: IBook): Promise<IBook>;
    getOne(id: string): Promise<IBook>;
    deleteOne(id: string): Promise<any>;
    list(): Promise<IBook[]>;
}
