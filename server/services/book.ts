import { ObjectID } from "bson";
import createHttpError from "http-errors";
import { inject, injectable } from "inversify";

import { IBook, Book } from "../interfaces/models/IBook";
import { BookService } from "../interfaces/services/IBook";
import { TYPES } from "../types";

@injectable()
export class BookServiceImpl implements BookService {

    constructor(
        @inject(TYPES.Book) private bookModel: Book
    ) {
    }

    async save(bookData: IBook): Promise<IBook> {
        if (!this.bookModel.validate(bookData)) {
            throw createHttpError(400, 'Not valid data', { details: this.bookModel.validatorErrors });
        }
        delete bookData._id;
        if (bookData?.authors.length) {
            bookData.authors = bookData.authors.map(id => new ObjectID(id));
        }
        return this.bookModel.insert(bookData);
    }

    async update(id: string, bookData: IBook): Promise<IBook> {
        const book = await this.bookModel.findOne(id);
        if (!book) {
            throw createHttpError(404, 'Not found');
        }
        if (!this.bookModel.validate(bookData)) {
            throw createHttpError(400, 'Not valid data', { details: this.bookModel.validatorErrors });
        }
        if (bookData?.authors.length) {
            bookData.authors = bookData.authors.map(id => new ObjectID(id));
        }
        delete bookData._id;
        return this.bookModel.update(id, bookData).then(res => bookData);
    }

    async getOne(id: string): Promise<IBook> {
        const data = await this.bookModel.findOne(id);
        if (!data) {
            throw createHttpError(404, 'Not found');
        }
        return data;
    }

    async deleteOne(id: string): Promise<any> {
        const data = await this.bookModel.findOne(id);
        if (!data) {
            throw createHttpError(404, 'Not found');
        }
        return this.bookModel.deleteOne(id);
    }

    async list(): Promise<IBook[]> {
        const data = await this.bookModel.findAll();
        return data;
    }

}
