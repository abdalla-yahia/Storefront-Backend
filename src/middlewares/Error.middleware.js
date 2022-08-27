"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errMiddleware = (err, req, res, next) => {
    const statuse = err.status || 500;
    const message = err.message || `Opps .. Something wrong `;
    res.json({
        st: statuse,
        ms: message
    });
};
exports.default = errMiddleware;
