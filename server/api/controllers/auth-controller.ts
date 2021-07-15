import createHttpError from "http-errors";
import { Context, Next } from "koa";
import { request, summary, body, tagsAll, responsesAll, security } from 'koa-swagger-decorator';

import getProperitesFromSchema from "../../loaders/properties-from-scheme";
import container from "../../config/inversify.config";
import { AuthService } from "../../interfaces/services/IAuth";
import { TYPES } from "../../types";
import { UserSchema } from "../../models/user";

@tagsAll(["auth"])
@responsesAll(
    {
        200: {
            description: 'success',
            schema: {
                type: 'object',
                properties: {
                    token: { type: 'string' },
                    user: { type: 'object', properties: getProperitesFromSchema(UserSchema, ["password"]) }
                }
            }
        },
        400: { description: 'Not valid request' },
        401: { description: 'access denied' }
    })
export default class AuthController {

    @request('post', 'auth/signin')
    @summary('sign in the application')
    @body({
        email: { type: "string", required: true, example: "giulio.cesare@email.com" },
        password: { type: "string", required: true, example: "secretpassword" }
    })
    @security([{ ApiKey: [] }])
    static async signin(ctx: Context, next: Next) {
        const body = ctx.request.body;
        const authService = container.get<AuthService>(TYPES.AuthService);
        if (!body.email || !body.password) {
            throw createHttpError(400, 'Not valid request');
        }
        try {
            const result = await authService.signIn(body.email, body.password);
            ctx.body = result;
            next();
        } catch (error) {
            throw createHttpError(401, 'access_denied', error);
        }
    }

    @request('post', 'auth/register')
    @summary('sign in the application')
    @body(getProperitesFromSchema(UserSchema, ["_id"]))
    @security([{ ApiKey: [] }])
    static async register(ctx: Context, next: Next) {
        const body = ctx.request.body;
        const authService = container.get<AuthService>(TYPES.AuthService);
        try {
            const result = await authService.register(body);
            ctx.body = result;
            next();
        } catch (error) {
            throw error;
        }
    }
}


// export default { register, signin };
