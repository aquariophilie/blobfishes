import Router from "koa-router";
import controller from "../controllers/auth-controller";

const router = new Router();
router.prefix('/auth');
router.post('/register', controller.register);
router.post('/signin', controller.signin);

export default router;
