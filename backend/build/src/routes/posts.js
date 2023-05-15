"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const post_1 = __importDefault(require("../models/post"));
const requireParams_1 = __importDefault(require("../../middlewares/requireParams"));
const router = new router_1.default();
// LIST
router.get('/', async (ctx) => {
    ctx.body = await post_1.default.findAll();
});
// CREATE
router.post('/', (0, requireParams_1.default)(['name', 'description']), async (ctx) => {
    try {
        const postData = ctx.request.body;
        const post = await post_1.default.create(postData);
        ctx.body = post;
        ctx.status = 201;
    }
    catch (error) {
        ctx.throw(400, error);
    }
});
router.param('postId', async (id, ctx, next) => {
    try {
        ctx.state.post = await post_1.default.findByPk(id);
    }
    catch (error) {
        ctx.throw(400, 'Post not found.');
    }
    await next();
});
// SHOW
router.get('/:postId', async (ctx) => {
    ctx.body = ctx.state.post;
});
// UPDATE
router.put('/:postId', async (ctx) => {
    const { post } = ctx.state;
    const postData = ctx.request.body;
    try {
        await post.update(postData);
        ctx.body = post;
    }
    catch (error) {
        ctx.throw(400, error.message);
    }
});
// DELETE
router.delete('/:postId', async (ctx) => {
    const { post } = ctx.state;
    await post.destroy();
    ctx.body = post;
});
exports.default = router;
