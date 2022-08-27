"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const error_middlware_1 = __importDefault(require("./middleware/error.middlware"));
const configration_1 = __importDefault(require("./configration"));
const index_1 = __importDefault(require("./database/index"));
const app = (0, express_1.default)();
const port = configration_1.default.Port || 4500;
app.listen(port, () => {
    console.log(`server running at port ${port}....!!`);
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use((0, helmet_1.default)());
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Sory comeback after One Houre',
}));
app.use(error_middlware_1.default);
app.get('/', (req, res) => {
    console.log(req.url);
    res.send('this is root ..');
});
app.use((_req, res) => {
    res.status(404).send('Oops..!!  Page Not Found');
});
index_1.default.connect().then(Client => {
    return Client.query('SELECT NOW()').then(res => {
        Client.release();
        console.log(res.rows);
    }).catch(err => {
        Client.release();
        console.log(err);
    });
});
