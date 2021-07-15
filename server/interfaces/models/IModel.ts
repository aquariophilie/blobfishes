import { ErrorObject } from "ajv";
import { Collection, DeleteWriteOpResultObject } from "mongodb";

export interface IModel<T> {
    readonly collection: Promise<Collection<T>>;
    readonly validatorErrors: null | ErrorObject[];
    validate(data: T): any;
    findAll(): Promise<T[]>;
    findOne(id: string): Promise<T | null>;
    findMany(idList: string[]): Promise<T[]>;
    deleteOne(id: string): Promise<any>;
    insert(data: T): Promise<T>;
    insertMany(data: T[]): Promise<any>;
    update(id: string, data: any): Promise<any>;
    deleteMany(idList: string[]): Promise<DeleteWriteOpResultObject>;
    count(): Promise<any>;
}
