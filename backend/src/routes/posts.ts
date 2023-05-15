import Router from '@koa/router';
import Post from '../models/post';
import requireParams from '../../middlewares/requireParams';

const router = new Router();

// LIST
router.get('/', async (ctx) => {
  const posts = await Post.findAll();
  console.log(posts);
  ctx.body = posts;
});

// CREATE
router.post('/', requireParams(['name', 'description']), async (ctx) => {
  try {
    const postData = ctx.request.body as Partial<Post>;
    const post = await Post.create(postData);
    ctx.body = post;
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.param('postId', async (id, ctx, next) => {
  ctx.state.post = await Post.findByPk(id);
  if (!ctx.state.post) {
    ctx.throw(404, 'Post not found.');
  }
  await next();
});

// SHOW
router.get('/:postId', async (ctx) => {
  const { post } = ctx.state;
  ctx.body = post;
});

// UPDATE
router.put('/:postId', async (ctx) => {
  const { post } = ctx.state as { post: Post };
  const postData = ctx.request.body as Partial<Post>;
  try {
    await post.update(postData);
    ctx.body = post;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// DELETE
router.delete('/:postId', async (ctx) => {
  const { post } = ctx.state as { post: Post };
  await post.destroy();
  ctx.body = post;
});

export default router;
