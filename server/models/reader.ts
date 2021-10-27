import { injectable } from 'inversify';
import Ajv, { Schema } from "ajv"
import addFormats from "ajv-formats"

import { IReader, Reader } from '../interfaces/models/IReader';
import { Model } from './model';

export const ReaderSchema: Schema = {
    type: "object",
    properties: {
        _id: { type: "string" },
        name: { type: "string", minLength: 3, example: "Homer" },
        books_read: {
            type: "array", items: { type: "object" }, example: [{
                "id": "ofmom209f24",
                "name": "The Hitchhiker's Guide to the Galaxy"
            }]
        },
        now_reading: {
            type: "array", items: { type: "object" }, example: []
        },
    },
    required: ["name"],
    additionalProperties: false,
}

@injectable()
export class ReaderModel extends Model<IReader> implements Reader {

    protected validator = addFormats(new Ajv().addKeyword('example')).compile(ReaderSchema);
    protected collectionName = 'readers';

}
