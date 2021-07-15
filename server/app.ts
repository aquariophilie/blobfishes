import 'reflect-metadata'; // We need this in order to use @Decorators

import Koa from "koa"
import Logger from "./loaders/logger";
import config from './config';

async function startServer() {
    const app = new Koa();


    await require('./loaders').default({ koaApp: app });

    app.listen(config.port, () => {
        Logger.info(`
        ################################################
        🛡️  Server listening on port: ${config.port} 🛡️
        ################################################
      `);
    }).on('error', err => {
        Logger.error(err);
        process.exit(1);
    });

}

startServer();
