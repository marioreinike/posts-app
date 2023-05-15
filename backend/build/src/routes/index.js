"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const posts_1 = __importDefault(require("./posts"));
const router = new router_1.default();
router.get('/', (ctx) => {
    ctx.status = 200;
});
router.use('/posts', posts_1.default.routes());
exports.default = router;
