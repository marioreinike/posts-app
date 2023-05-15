"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("@koa/cors"));
const koa_1 = __importDefault(require("koa"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const routes_1 = __importDefault(require("./routes"));
// App constructor
const app = new koa_1.default();
const testMode = app.env === 'test';
console.log(`App starting in mode: ${app.env}`);
/**
 * Middlewares
 */
app.use((0, cors_1.default)());
// log requests
if (!testMode) {
    app.use((0, koa_logger_1.default)());
}
// parse request body
app.use((0, koa_bodyparser_1.default)());
// Routing middleware
app.use(routes_1.default.routes());
exports.default = app;
