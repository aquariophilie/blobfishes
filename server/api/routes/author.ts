import Router from "koa-router";
import controller from "../controllers/author-controller";

const router = new Router();
router.prefix('/author');
router.get('/', controller.list);
router.post('/', controller.save);
router.get('/:id', controller.getOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
