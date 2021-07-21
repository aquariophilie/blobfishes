import createHttpError from "http-errors";
import { Context, Next } from "koa";
import { request, summary, body, tagsAll, responses, security, path } from 'koa-swagger-decorator';

import getProperitesFromSchema from "../../loaders/properties-from-scheme";
import container from "../../config/inversify.config";
import { TYPES } from "../../types";
import { ReaderSchema } from "../../models/reader";
import { ReaderService } from "../../interfaces/services/IReader";

const commonResponse = {
    400: { description: 'Not valid request' },
    404: { description: 'Not found' }
};
const commonPath = {
    id: { type: 'string', required: true, description: 'id of the data' },
};
@tagsAll(["reader"])
export default class ReaderController {

    @request('post', 'reader')
    @summary('save reader')
    @body(getProperitesFromSchema(ReaderSchema, ["_id"]))
    @responses({
        ...commonResponse,
        200: { description: "data saved successfully", schema: ReaderSchema }
    })
    static async save(ctx: Context, next: Next) {
        const body = ctx.request.body;
        const readerService = container.get<ReaderService>(TYPES.ReaderService);
        const data = await readerService.save(body);
        ctx.body = data || {};
        next();
    }

    @request('put', 'reader')
    @summary('update reader')
    @body(getProperitesFromSchema(ReaderSchema, ["_id"]))
    @responses({
        ...commonResponse,
        200: { description: "data updated successfully", schema: ReaderSchema }
    })
    static async update(ctx: Context, next: Next) {
        const body = ctx.request.body;
        const readerService = container.get<ReaderService>(TYPES.ReaderService);
        const id = ctx.params.id;
        if (!id) {
            throw createHttpError(400, 'Missing id');
        }
        const data = await readerService.update(id, body);
        ctx.body = data || {};
        next();
    }

    @request('get', 'reader')
    @summary('get saved readers')
    @responses({
        ...commonResponse,
        200: {
            description: "array of data", schema: {
                type: "array",
                items: ReaderSchema
            }
        }
    })
    static async list(ctx: Context, next: Next) {
        const readerService = container.get<ReaderService>(TYPES.ReaderService);
        const data = await readerService.list();
        ctx.body = data || [];
        next();
    }

    @request('get', 'reader/{id}')
    @summary('get one reader by id')
    @path(commonPath)
    @responses({
        ...commonResponse,
        200: {
            description: "object of data", schema: ReaderSchema
        }
    })
    static async getOne(ctx: Context, next: Next) {
        const id = ctx.params.id;
        if (!id) {
            throw createHttpError(400, 'Missing id');
        }
        const readerService = container.get<ReaderService>(TYPES.ReaderService);
        const data = await readerService.getOne(id);
        ctx.body = data || null;
        next();
    }

    @request('delete', 'reader/{id}')
    @summary('delete one reader by id')
    @path(commonPath)
    @responses({
        ...commonResponse,
        200: {
            description: "successfully deleted"
        }
    })
    static async delete(ctx: Context, next: Next) {
        const id = ctx.params.id;
        const readerService = container.get<ReaderService>(TYPES.ReaderService);
        if (!id) {
            throw createHttpError(400, 'Missing id');
        }
        const res = await readerService.deleteOne(id);
        ctx.body = '';
        next();
    }


}

