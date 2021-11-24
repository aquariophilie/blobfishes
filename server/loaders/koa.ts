import Koa from "koa";
import koaBody from "koa-body";
import cors from "@koa/cors";
import serve from "koa-static";
import path from "path";
import fs from "fs";

import config from '../config';
import route from '../api';
import swagger from "../api/swagger";
import errorHandler from "../api/middlewares/error-handler";

const proccessPath = process.cwd();

export default ({ app }: { app: Koa }) => {

    app.use(cors({ credentials: true }));

    app.use(errorHandler);
    // Middleware that transforms the raw string of req.body into json
    app.use(koaBody({ jsonLimit: '100mb' }));

    if (process.env.NODE_ENV === 'development') {
        const swaggerRoute = swagger();
        app.use(swaggerRoute.routes()).use(swaggerRoute.allowedMethods());
    }

    /* const unlessPaths = [/^\/api\/auth/, "/", '/api/status'];
     app.use(jwt({
        secret: config.jwtSecret,
        algorithms: [config.jwtAlgorithm]
    }).unless({
        path: unlessPaths
    })); */
    // Load client
    if (config.publicDir) {
        const publicDirPath = `${proccessPath}${path.sep}${config.publicDir}`;
        const validRoutes = fs.readdirSync(publicDirPath);

        function isRouteValid(url: string) {
            if (!validRoutes || !url) return false
            const urlStart = url.split('/').filter(item => item)[0] || '';
            return validRoutes.find(route => urlStart === route)
        }
        app.use(async (ctx, next) => {
            if (!ctx.url.startsWith(config.api.prefix) && !isRouteValid(ctx.url)) {
                ctx.path = '/'
            }
            await next();
        })
        app.use(serve(publicDirPath, {
            brotli: true
        }));
    }

    // Load API routes
    if (process.env.NODE_ENV === 'development') {
        console.log(route.stack.map(i => i.path));
    }
    app.use(route.routes()).use(route.allowedMethods());
};
