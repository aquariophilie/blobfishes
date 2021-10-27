import { injectable } from 'inversify';
import Ajv, { Schema } from "ajv"

import { IBook, Book } from '../interfaces/models/IBook';
import { Model } from './model';
import { AggregationCursor, Collection } from 'mongodb';

export const BookSchema: Schema = {
    type: "object",
    properties: {
        _id: { type: "string" },
        title: { type: "string", minLength: 3, example: "The Hitchhiker's Guide to the Galaxy" },
        authors: {
            type: "array", items: { type: "string" }
        },
        genres: {
            type: "array", items: { type: "string" }, example: [
                "science fiction",
                "comedy"
            ]
        },
        location: { type: "string", minLength: 3, example: "Living Room" },
        owner: { type: "string", minLength: 3, example: "homer" },
        reading: { type: "array", items: { type: "string" } }
    },
    required: ["title", "authors", "genres"],
    additionalProperties: false,
}
const validatorSchema = new Ajv().addKeyword('example').compile(BookSchema);

@injectable()
export class BookModel extends Model<IBook> implements Book {

    protected validator = validatorSchema;
    protected collectionName = 'books';

    public async findAll(): Promise<IBook[]> {
        return this.aggregate((await this.collection)).toArray();
    }

    private aggregate(collection: Collection): AggregationCursor {
        return collection.aggregate([{
            $lookup:
            {
                from: 'authors',
                localField: 'authors',
                foreignField: '_id',
                as: 'authors'
            }
        }]);
    }

}
