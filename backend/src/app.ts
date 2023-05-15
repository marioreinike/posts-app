import cors from '@koa/cors';
import Koa from 'koa';
import koaLogger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import routes from './routes';

// App constructor
const app = new Koa();

const testMode = app.env === 'test';

console.log(`App starting in mode: ${app.env}`);

/**
 * Middlewares
 */
app.use(cors());

// log requests
if (!testMode) {
  app.use(koaLogger());
}

// parse request body
app.use(bodyParser());

// Routing middleware
app.use(routes.routes());

export default app;
