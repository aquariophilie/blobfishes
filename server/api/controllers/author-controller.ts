import createHttpError from "http-errors";
import { Context, Next } from "koa";
import { request, summary, body, tagsAll, responses, security, path } from 'koa-swagger-decorator';

import getProperitesFromSchema from "../../loaders/properties-from-scheme";
import container from "../../config/inversify.config";
import { TYPES } from "../../types";
import { AuthorSchema } from "../../models/author";
import { AuthorService } from "../../interfaces/services/IAuthor";

const commonResponse = {
    400: { description: 'Not valid request' },
    404: { description: 'Not found' }
};
const commonPath = {
    id: { type: 'string', required: true, description: 'id of the data' },
};
@tagsAll(["author"])
export default class AuthorController {

    @request('post', 'author')
    @summary('save author')
    @body(getProperitesFromSchema(AuthorSchema, ["_id"]))
    @responses({
        ...commonResponse,
        200: { description: "data saved successfully", schema: AuthorSchema }
    })
    static async save(ctx: Context, next: Next) {
        const body = ctx.request.body;
        const authorService = container.get<AuthorService>(TYPES.AuthorService);
        const data = await authorService.save(body);
        ctx.body = data || {};
        next();
    }

    @request('put', 'author')
    @summary('update author')
    @body(getProperitesFromSchema(AuthorSchema, ["_id"]))
    @responses({
        ...commonResponse,
        200: { description: "data updated successfully", schema: AuthorSchema }
    })
    static async update(ctx: Context, next: Next) {
        const body = ctx.request.body;
        const authorService = container.get<AuthorService>(TYPES.AuthorService);
        const id = ctx.params.id;
        if (!id) {
            throw createHttpError(400, 'Missing id');
        }
        const data = await authorService.update(id, body);
        ctx.body = data || {};
        next();
    }

    @request('get', 'author')
    @summary('get saved authors')
    @responses({
        ...commonResponse,
        200: {
            description: "array of data", schema: {
                type: "array",
                items: AuthorSchema
            }
        }
    })
    static async list(ctx: Context, next: Next) {
        const authorService = container.get<AuthorService>(TYPES.AuthorService);
        const data = await authorService.list();
        ctx.body = data || [];
        next();
    }

    @request('get', 'author/{id}')
    @summary('get one author by id')
    @path(commonPath)
    @responses({
        ...commonResponse,
        200: {
            description: "object of data", schema: AuthorSchema
        }
    })
    static async getOne(ctx: Context, next: Next) {
        const id = ctx.params.id;
        if (!id) {
            throw createHttpError(400, 'Missing id');
        }
        const authorService = container.get<AuthorService>(TYPES.AuthorService);
        const data = await authorService.getOne(id);
        ctx.body = data || null;
        next();
    }

    @request('delete', 'author/{id}')
    @summary('delete one author by id')
    @path(commonPath)
    @responses({
        ...commonResponse,
        200: {
            description: "successfully deleted"
        }
    })
    static async delete(ctx: Context, next: Next) {
        const id = ctx.params.id;
        const authorService = container.get<AuthorService>(TYPES.AuthorService);
        if (!id) {
            throw createHttpError(400, 'Missing id');
        }
        const res = await authorService.deleteOne(id);
        ctx.body = '';
        next();
    }


}

