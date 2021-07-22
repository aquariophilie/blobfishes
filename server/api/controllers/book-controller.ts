import createHttpError from "http-errors";
import { Context, Next } from "koa";
import { request, summary, body, tagsAll, responses, security, path } from 'koa-swagger-decorator';

import getProperitesFromSchema from "../../loaders/properties-from-scheme";
import container from "../../config/inversify.config";
import { TYPES } from "../../types";
import { BookSchema } from "../../models/book";
import { BookService } from "../../interfaces/services/IBook";

const commonResponse = {
    400: { description: 'Not valid request' },
    404: { description: 'Not found' }
};
const commonPath = {
    id: { type: 'string', required: true, description: 'id of the data' },
};
@tagsAll(["book"])
export default class BookController {

    @request('post', 'book')
    @summary('save book')
    @body(getProperitesFromSchema(BookSchema, ["_id"]))
    @responses({
        ...commonResponse,
        200: { description: "data saved successfully", schema: BookSchema }
    })
    static async save(ctx: Context, next: Next) {
        const body = ctx.request.body;
        const bookService = container.get<BookService>(TYPES.BookService);
        const data = await bookService.save(body);
        ctx.body = data || {};
        next();
    }

    @request('put', 'book')
    @summary('update book')
    @body(getProperitesFromSchema(BookSchema, ["_id"]))
    @responses({
        ...commonResponse,
        200: { description: "data updated successfully", schema: BookSchema }
    })
    static async update(ctx: Context, next: Next) {
        const body = ctx.request.body;
        const bookService = container.get<BookService>(TYPES.BookService);
        const id = ctx.params.id;
        if (!id) {
            throw createHttpError(400, 'Missing id');
        }
        const data = await bookService.update(id, body);
        ctx.body = data || {};
        next();
    }

    @request('get', 'book')
    @summary('get saved books')
    @responses({
        ...commonResponse,
        200: {
            description: "array of data", schema: {
                type: "array",
                items: BookSchema
            }
        }
    })
    static async list(ctx: Context, next: Next) {
        const bookService = container.get<BookService>(TYPES.BookService);
        const data = await bookService.list();
        ctx.body = data || [];
        next();
    }

    @request('get', 'book/{id}')
    @summary('get one book by id')
    @path(commonPath)
    @responses({
        ...commonResponse,
        200: {
            description: "object of data", schema: BookSchema
        }
    })
    static async getOne(ctx: Context, next: Next) {
        const id = ctx.params.id;
        if (!id) {
            throw createHttpError(400, 'Missing id');
        }
        const bookService = container.get<BookService>(TYPES.BookService);
        const data = await bookService.getOne(id);
        ctx.body = data || null;
        next();
    }

    @request('delete', 'book/{id}')
    @summary('delete one book by id')
    @path(commonPath)
    @responses({
        ...commonResponse,
        200: {
            description: "successfully deleted"
        }
    })
    static async delete(ctx: Context, next: Next) {
        const id = ctx.params.id;
        const bookService = container.get<BookService>(TYPES.BookService);
        if (!id) {
            throw createHttpError(400, 'Missing id');
        }
        const res = await bookService.deleteOne(id);
        ctx.body = '';
        next();
    }


}

