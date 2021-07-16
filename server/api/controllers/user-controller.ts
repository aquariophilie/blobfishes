import createHttpError from "http-errors";
import { Context, Next } from "koa";
import { request, summary, body, tagsAll, responses, security, path } from 'koa-swagger-decorator';

import getProperitesFromSchema from "../../loaders/properties-from-scheme";
import container from "../../config/inversify.config";
import { IUser } from "../../interfaces/models/IUser";
import { TYPES } from "../../types";
import { UserSchema } from "../../models/user";
import { UserService } from "../../interfaces/services/IUser";

const commonResponse = {
    400: { description: 'Not valid request' },
    403: { description: 'Forbidden' },
    401: { description: 'Access denied' },
    404: { description: 'Not found' }
};
const commonPath = {
    id: { type: 'string', required: true, description: 'id of the data' },
};
@tagsAll(["user"])
export default class UserController {

    @request('post', 'user')
    @summary('save user')
    @body(getProperitesFromSchema(UserSchema, ["_id"]))
    @responses({
        ...commonResponse,
        200: { description: "data saved successfully", schema: UserSchema }
    })
    @security([{ ApiKey: [], BearerAuth: [] }])
    static async save(ctx: Context, next: Next) {
        const body = ctx.request.body;
        const userService = container.get<UserService>(TYPES.UserService);
        const authUser: IUser = ctx.state?.user?.data;
        if (!authUser) {
            throw createHttpError(401, 'Access denied');
        }
        const data = await userService.save(body, authUser);
        ctx.body = data || {};
        next();
    }

    @request('put', 'user')
    @summary('update user')
    @body(getProperitesFromSchema(UserSchema, ["_id"]))
    @responses({
        ...commonResponse,
        200: { description: "data updated successfully", schema: UserSchema }
    })
    @security([{ ApiKey: [], BearerAuth: [] }])
    static async update(ctx: Context, next: Next) {
        const body = ctx.request.body;
        const userService = container.get<UserService>(TYPES.UserService);
        const authUser: IUser = ctx.state?.user?.data;
        const id = ctx.params.id;
        if (!authUser) {
            throw createHttpError(401, 'Access denied');
        }
        if (!id) {
            throw createHttpError(400, 'Missing id');
        }
        const data = await userService.update(id, body, authUser);
        ctx.body = data || {};
        next();
    }

    @request('get', 'user')
    @summary('get saved users')
    @responses({
        ...commonResponse,
        200: {
            description: "array of data", schema: {
                type: "array",
                items: UserSchema
            }
        }
    })
    @security([{ ApiKey: [], BearerAuth: [] }])
    static async list(ctx: Context, next: Next) {
        const authUser: IUser = ctx.state?.user?.data;
        const userService = container.get<UserService>(TYPES.UserService);
        if (!authUser) {
            throw createHttpError(401, 'Access denied');
        }
        const data = await userService.list(authUser);
        ctx.body = data || [];
        next();
    }

    @request('get', 'user/{id}')
    @summary('get one user by id')
    @path(commonPath)
    @responses({
        ...commonResponse,
        200: {
            description: "object of data", schema: UserSchema
        }
    })
    @security([{ ApiKey: [], BearerAuth: [] }])
    static async getOne(ctx: Context, next: Next) {
        const authUser: IUser = ctx.state?.user?.data;
        const id = ctx.params.id;
        if (!id) {
            throw createHttpError(400, 'Missing id');
        }
        const userService = container.get<UserService>(TYPES.UserService);
        if (!authUser) {
            throw createHttpError(401, 'Access denied');
        }
        const data = await userService.getOne(id, authUser);
        ctx.body = data || null;
        next();
    }

    @request('delete', 'user/{id}')
    @summary('delete one user by id')
    @path(commonPath)
    @responses({
        ...commonResponse,
        200: {
            description: "successfully deleted"
        }
    })
    @security([{ ApiKey: [], BearerAuth: [] }])
    static async delete(ctx: Context, next: Next) {
        const authUser: IUser = ctx.state?.user?.data;
        const id = ctx.params.id;
        const userService = container.get<UserService>(TYPES.UserService);
        if (!id) {
            throw createHttpError(400, 'Missing id');
        }  
        if (!authUser) {
            throw createHttpError(401, 'Access denied');
        }
        const res = await userService.deleteOne(id, authUser);
        ctx.body = '';
        next();
    }


}

