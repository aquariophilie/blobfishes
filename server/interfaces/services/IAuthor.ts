import { IAuthor } from "../models/IAuthor";

export interface AuthorService {
    save(authorData: IAuthor): Promise<IAuthor>;
    update(id: string, authorData: IAuthor): Promise<IAuthor>;
    getOne(id: string): Promise<IAuthor>;
    deleteOne(id: string): Promise<any>;
    list(): Promise<IAuthor[]>;
}
