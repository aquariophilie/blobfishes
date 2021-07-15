import { HttpError } from "http-errors";
import { Context, Next } from "koa";
import { MongoError } from "mongodb";
import Logger from "../../loaders/logger";

export default async (ctx: Context, next: Next) => {
    try {
        await next();
    } catch (err) {
        Logger.error(err);
        // will only respond with JSON
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message || 'Internal server error',
            details: err.details || err
        };
    }
};
