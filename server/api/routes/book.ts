import Router from "koa-router";
import controller from "../controllers/book-controller";

const router = new Router();
router.prefix('/book');
router.get('/', controller.list);
router.post('/', controller.save);
router.get('/:id', controller.getOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
