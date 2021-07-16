import Koa from "koa";
import koaBody from "koa-body";
import jwt from "koa-jwt";
import cors from "@koa/cors";

import config from "../config";
import route from '../api';
import swagger from "../api/swagger";
import errorHandler from "../api/middlewares/error-handler";

export default ({ app }: { app: Koa }) => {

    app.use(cors({credentials: true}));

    app.use(errorHandler);
    // Middleware that transforms the raw string of req.body into json
    app.use(koaBody({jsonLimit: '100mb'}));

    if (process.env.NODE_ENV === 'development') {
        const swaggerRoute = swagger();
        app.use(swaggerRoute.routes()).use(swaggerRoute.allowedMethods());
    }

    const unlessPaths = [/^\/api\/auth/, "/", '/api/status'];
    app.use(jwt({
        secret: config.jwtSecret,
        algorithms: [config.jwtAlgorithm]
    }).unless({
        path: unlessPaths
    }));
    
    // Load API routes
    console.log(route.stack.map(i => i.path));
    app.use(route.routes()).use(route.allowedMethods());
};