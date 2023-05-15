import Router from '@koa/router';
import postsRoutes from './posts';

const router = new Router();

router.get('/', (ctx) => {
  ctx.status = 200;
});

router.use('/posts', postsRoutes.routes());

export default router;
