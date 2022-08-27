"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMidlware = (error, req, res, nxt) => {
    const status = error.status || 500;
    const message = error.message || "No way !! Page Not Found !!";
    res.status(status).json({ status, message });
};
exports.default = errorMidlware;
