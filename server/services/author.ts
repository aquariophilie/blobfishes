import createHttpError from "http-errors";
import { inject, injectable } from "inversify";

import { IAuthor, Author } from "../interfaces/models/IAuthor";
import { AuthorService } from "../interfaces/services/IAuthor";
import { TYPES } from "../types";

@injectable()
export class AuthorServiceImpl implements AuthorService {

    constructor(
        @inject(TYPES.Author) private authorModel: Author
    ) {
    }

    async save(authorData: IAuthor): Promise<IAuthor> {
        if (!this.authorModel.validate(authorData)) {
            throw createHttpError(400, 'Not valid data', { details: this.authorModel.validatorErrors });
        }
        delete authorData._id;
        if (authorData.birthday) {
            authorData.birthday = new Date(authorData.birthday);
        }
        return this.authorModel.insert(authorData);
    }

    async update(id: string, authorData: IAuthor): Promise<IAuthor> {
        const author = await this.authorModel.findOne(id);
        if (!author) {
            throw createHttpError(404, 'Not found');
        }
        if (!this.authorModel.validate(authorData)) {
            throw createHttpError(400, 'Not valid data', { details: this.authorModel.validatorErrors });
        }
        delete authorData._id;
        if (authorData.birthday) {
            authorData.birthday = new Date(authorData.birthday);
        }
        return this.authorModel.update(id, authorData).then(res => authorData);
    }

    async getOne(id: string): Promise<IAuthor> {
        const data = await this.authorModel.findOne(id);
        if (!data) {
            throw createHttpError(404, 'Not found');
        }
        return data;
    }

    async deleteOne(id: string): Promise<any> {
        const data = await this.authorModel.findOne(id);
        if (!data) {
            throw createHttpError(404, 'Not found');
        }
        return this.authorModel.deleteOne(id);
    }

    async list(): Promise<IAuthor[]> {
        const data = await this.authorModel.findAll();
        return data;
    }

}
