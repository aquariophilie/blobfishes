import createHttpError from "http-errors";
import { inject, injectable } from "inversify";

import { IReader, Reader } from "../interfaces/models/IReader";
import { ReaderService } from "../interfaces/services/IReader";
import { TYPES } from "../types";

@injectable()
export class ReaderServiceImpl implements ReaderService {

    constructor(
        @inject(TYPES.Reader) private readerModel: Reader
    ) {
    }

    async save(readerData: IReader): Promise<IReader> {
        if (!this.readerModel.validate(readerData)) {
            throw createHttpError(400, 'Not valid data', { details: this.readerModel.validatorErrors });
        }
        delete readerData._id;
        return this.readerModel.insert(readerData);
    }

    async update(id: string, readerData: IReader): Promise<IReader> {
        const reader = await this.readerModel.findOne(id);
        if (!reader) {
            throw createHttpError(404, 'Not found');
        }
        if (!this.readerModel.validate(readerData)) {
            throw createHttpError(400, 'Not valid data', { details: this.readerModel.validatorErrors });
        }
        delete readerData._id;
        return this.readerModel.update(id, readerData).then(res => readerData);
    }

    async getOne(id: string): Promise<IReader> {
        const data = await this.readerModel.findOne(id);
        if (!data) {
            throw createHttpError(404, 'Not found');
        }
        return data;
    }

    async deleteOne(id: string): Promise<any> {
        const data = await this.readerModel.findOne(id);
        if (!data) {
            throw createHttpError(404, 'Not found');
        }
        return this.readerModel.deleteOne(id);
    }

    async list(): Promise<IReader[]> {
        const data = await this.readerModel.findAll();
        return data;
    }

}
