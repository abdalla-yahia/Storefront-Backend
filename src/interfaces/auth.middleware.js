"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configration_1 = __importDefault(require("../configration"));
const authErrorValidate = (next) => {
    const error = new Error("Logining Faild :Please Try Again");
    error.status = 401;
    next(error);
};
const validateToken = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auth = req.get('Authorization');
        if (auth) {
            const barer = auth.split(' ')[0];
            const token = auth.split(' ')[1];
            if (token && barer === 'Bearer') {
                const decode = jsonwebtoken_1.default.verify(token, configration_1.default.token);
                if (decode) {
                    next();
                }
                else {
                    authErrorValidate(next);
                }
            }
            else {
                authErrorValidate(next);
            }
        }
        else {
            authErrorValidate(next);
        }
    }
    catch (error) {
        authErrorValidate(next);
    }
});
exports.default = validateToken;
