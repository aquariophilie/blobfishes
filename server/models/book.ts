import { injectable } from 'inversify';
import Ajv, { Schema } from "ajv"

import { IBook, Book } from '../interfaces/models/IBook';
import { Model } from './model';

export const BookSchema: Schema = {
    type: "object",
    properties: {
        _id: { type: "string" },
        title: { type: "string", minLength: 3, example: "The Hitchhiker's Guide to the Galaxy" },
        authors: {
            type: "array", items: { type: "object" }, example: [{
                "id": 1,
                "name": "Douglas Adams"
            }]
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

@injectable()
export class BookModel extends Model<IBook> implements Book {

    protected validator = new Ajv().addKeyword('example').compile(BookSchema);
    protected collectionName: string = 'books';

}
