import { inject, injectable } from 'inversify';
import { Collection, Db, DeleteWriteOpResultObject, ObjectID, UpdateQuery } from 'mongodb';
import { ErrorObject, ValidateFunction } from "ajv"

import { MongoDBClient } from '../loaders/mongo-client';
import { TYPES } from '../types';
import { IModel } from '../interfaces/models/IModel';
import { FilterQuery } from 'mongodb';
import { OptionalId } from 'mongodb';

@injectable()
export abstract class Model<T> implements IModel<T> {

    protected validator: ValidateFunction | undefined;
    protected collectionName: string;

    constructor(
        @inject(TYPES.MongoClient) protected mongo: MongoDBClient,
    ) {
    }

    get validatorErrors(): null | ErrorObject[] {
        return this.validator.errors;
    }

    get db(): Promise<Db> {
        return this.mongo.getDb();
    }

    get collection(): Promise<Collection<T>> {
        return this.db.then(val => val.collection<T>(this.collectionName));
    }

    public validate(data: T) {
        const res = this.validator(data);
        return res;
    }

    public async findAll(): Promise<T[]> {
        return (await this.collection).find().toArray();
    }

    public async findOne(id: string): Promise<T | null> {
        return (await this.collection).findOne({ _id: new ObjectID(id) } as FilterQuery<T>);
    }

    public async findMany(idList: string[]): Promise<T[]> {
        const objects = idList.map(value => new ObjectID(value)) as any[];
        return (await this.collection).find({ _id: { $in: objects } }).toArray();
    }

    public async deleteOne(id: string): Promise<any> {
        const result = await (await this.collection).deleteOne({ _id: new ObjectID(id) } as FilterQuery<T>);
        if (!result?.result?.ok) {
            throw Error('Error while deleting');
        }
        return result?.result?.ok;
    }

    public async deleteMany(idList: string[]): Promise<DeleteWriteOpResultObject> {
        const objects = idList.map(value => new ObjectID(value)) as any[];
        const result = await (await this.collection).deleteMany({ _id: { $in: objects } });
        if (!result?.result?.ok) {
            throw Error('Error while deleting');
        }
        return result;
    }

    public async insert(data: T): Promise<T> {
        const result = await (await this.collection).insertOne(data as OptionalId<T>);
        const resultData = result.ops[0];
        return resultData as T;
    }

    public async insertMany(data: T[]): Promise<any> {
        const result = await (await this.collection).insertMany(data as OptionalId<T>[]);
        return result.result;
    }

    public async update(id: string, data: any): Promise<any> {
        const query = { _id: new ObjectID(id) } as FilterQuery<T>;
        const result = await (await this.collection).updateOne(query, { $set: data });
        const resultData = result.result;
        return resultData;
    }

    public async count(): Promise<any> {
        return (await this.collection).count();
    }

}
