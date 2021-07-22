import Router from "koa-router";

import config from "../config";
import status from "./routes/status";
import auth from "./routes/auth";
import user from "./routes/user";
import book from "./routes/book";
import author from "./routes/author";
import reader from "./routes/reader";

const api = new Router();
api.prefix(config.api.prefix);
api.use(status.routes()).use(status.allowedMethods());
api.use(auth.routes()).use(auth.allowedMethods());
api.use(user.routes()).use(user.allowedMethods());
api.use(book.routes()).use(book.allowedMethods());
api.use(author.routes()).use(author.allowedMethods());
api.use(reader.routes()).use(reader.allowedMethods());
// guaranteed to get dependencies
export default api;
