import { RouterContext } from '@koa/router';
import { DefaultContext, DefaultState } from 'koa';

export default function requireParams(paramNames: string[]) {
  return async (ctx: RouterContext<DefaultState, DefaultContext>, next: () => Promise<void>) => {
    const params = ctx.request.body;
    paramNames.forEach((param) => {
      if (params[param] === undefined) {
        ctx.throw(400, `Error. Param ${param} is required for this request.`);
      }
    });
    await next();
  };
}
