"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const configration_1 = __importDefault(require("../configration"));
const pool = new pg_1.Pool({
    host: configration_1.default.host,
    database: configration_1.default.database,
    user: configration_1.default.user,
    password: configration_1.default.password,
    port: parseInt(configration_1.default.port, 10),
    max: 4
});
pool.on('error', (error) => {
    console.error(error.stack);
});
exports.default = pool;
