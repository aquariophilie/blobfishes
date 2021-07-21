import { IReader } from "../models/IReader";

export interface ReaderService {
    save(readerData: IReader): Promise<IReader>;
    update(id: string, readerData: IReader): Promise<IReader>;
    getOne(id: string): Promise<IReader>;
    deleteOne(id: string): Promise<any>;
    list(): Promise<IReader[]>;
}
