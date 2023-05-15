"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requireParams(paramNames) {
    return async (ctx, next) => {
        const params = ctx.request.body;
        paramNames.forEach((param) => {
            if (params[param] === undefined) {
                ctx.throw(400, `Error. Param ${param} is required for this request.`);
            }
        });
        await next();
    };
}
exports.default = requireParams;
