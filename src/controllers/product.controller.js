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
exports.Authentication = exports.DeleteAllProducts = exports.UpdateProduct = exports.GetProductByItsId = exports.DeleteProduct = exports.GetAllProducts = exports.creat = void 0;
const product_models_1 = __importDefault(require("../models/product.models"));
const configration_1 = __importDefault(require("../configration"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const produt = new product_models_1.default();
const creat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pro = yield produt.creat(req.body);
        res.json({
            "state": "success",
            data: Object.assign({}, pro),
            message: "Product created succesfly"
        });
    }
    catch (err) {
        next(err);
    }
});
exports.creat = creat;
const GetAllProducts = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProduct = yield produt.getAllProducts();
        let size = Object.keys(allProduct).length;
        if (size > 0) {
            res.json({
                state: "success",
                data: Object.assign({}, allProduct),
                message: "This Is All Products",
            });
        }
        else {
            res.json({
                message: "Sorry Not Found Eny Product..."
            });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.GetAllProducts = GetAllProducts;
const DeleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletItime = yield produt.deleteProduct(req.params);
        res.json({
            status: "Success",
            data: Object.assign({}, deletItime),
            message: "Delete Itime Successfly"
        });
    }
    catch (err) {
        next(err);
    }
});
exports.DeleteProduct = DeleteProduct;
const GetProductByItsId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SpecificProduct = yield produt.getSpecificProduct(req.params);
        res.json({
            data: Object.assign({}, SpecificProduct),
            status: "Success"
        });
    }
    catch (err) {
        next(err);
    }
});
exports.GetProductByItsId = GetProductByItsId;
const UpdateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UpdateProd = yield produt.updateProduct(req.body);
        res.json({
            state: "success",
            data: Object.assign({}, UpdateProd)
        });
    }
    catch (err) {
        next(err);
    }
});
exports.UpdateProduct = UpdateProduct;
const DeleteAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DelAllPro = yield produt.deleteAllProducts();
        res.json({
            status: "Done",
            message: "All Products Deleted Done",
            data: Object.assign({}, DelAllPro)
        });
    }
    catch (err) {
        next(err);
    }
});
exports.DeleteAllProducts = DeleteAllProducts;
const Authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email } = req.body;
        const auth_pro = yield produt.authentication(password, email);
        const token = jsonwebtoken_1.default.sign({ auth_pro }, configration_1.default.token);
        if (!auth_pro) {
            res.json({
                messsage: "User Not Valide"
            });
        }
        res.json({
            data: Object.assign(Object.assign({}, auth_pro), { token })
        });
    }
    catch (error) {
        next(error);
    }
});
exports.Authentication = Authentication;
