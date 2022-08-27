"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const configration_1 = __importDefault(require("../configration"));
const pool = new pg_1.Pool({
    host: configration_1.default.Host,
    database: configration_1.default.Database,
    user: configration_1.default.User_Name,
    port: parseInt(configration_1.default.Db_Port),
    password: configration_1.default.Password
});
pool.on('error', (error) => {
    console.log(error.message);
});
exports.default = pool;
