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
const databases_1 = __importDefault(require("../databases"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const configration_1 = __importDefault(require("../configration"));
const hashpassword = (password) => {
    const salt = parseInt(configration_1.default.salt);
    return bcrypt_1.default.hashSync(`${password}${configration_1.default.becrypt}`, salt);
};
class ProductModels {
    //Create New Product
    creat(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = databases_1.default.connect();
                const sql = `INSERT INTO products (name,price,count,total_price,password,email) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
                const result = yield (yield connection).query(sql, [
                    p.name,
                    p.price,
                    p.count,
                    p.total_price,
                    hashpassword(p.password),
                    p.email,
                ]);
                (yield connection).release();
                return result.rows[0];
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    //Get All Products
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = databases_1.default.connect();
                const sql = `SELECT * FROM products`;
                const resault = (yield connection).query(sql);
                (yield connection).release();
                return (yield resault).rows;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    //Get Specific Product
    getSpecificProduct(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield databases_1.default.connect();
                const sql = "SELECT id,name,count,price,total_price FROM products WHERE id = $1";
                const resault = connection.query(sql, [p.id]);
                connection.release();
                return (yield resault).rows[0];
            }
            catch (err) {
                throw new Error("Can not get product $1");
            }
        });
    }
    //Update Product
    updateProduct(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield databases_1.default.connect();
                const sql = "UPDATE products SET name=$1 ,price = $2 , count=$3, total_price = $4 WHERE id = $5 RETURNING id,name,price,count,total_price";
                const resault = connection.query(sql, [
                    p.name,
                    p.price,
                    p.count,
                    p.total_price,
                    p.id,
                ]);
                connection.release();
                return (yield resault).rows;
            }
            catch (err) {
                throw new Error(`cant update ${p.name} this product`);
            }
        });
    }
    //Delete One product By Its Id
    deleteProduct(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield databases_1.default.connect();
                const sql = "DELETE FROM products WHERE id = $1 RETURNING *";
                const resault = yield connection.query(sql, [p.id]);
                connection.release();
                return resault.rows[0];
            }
            catch (err) {
                throw new Error(`Itime  you wont deleted is not exist`);
            }
        });
    }
    //Delete All Products
    deleteAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield databases_1.default.connect();
                const sql = "DELETE FROM products ";
                const resault = yield connection.query(sql);
                connection.release();
                return resault.rows;
            }
            catch (err) {
                throw new Error("Can Not Delete All Products ");
            }
        });
    }
    //Authentication
    authentication(password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield databases_1.default.connect();
                const sql = "SELECT password FROM products WHERE email = $1";
                const resault = connection.query(sql, [email]);
                if ((yield resault).rows.length) {
                    const { password: hashpassword } = (yield resault).rows[0];
                    const ispasswordvalid = bcrypt_1.default.compareSync(password + configration_1.default.becrypt, hashpassword);
                    if (ispasswordvalid) {
                        const u = connection.query('SELECT name,price,count,total_price,email FROM products WHERE email =$1', [email]);
                        connection.release();
                        return (yield u).rows[0];
                    }
                }
                ;
                connection.release();
                return null;
            }
            catch (err) {
                throw new Error("Not Found The User");
            }
        });
    }
}
exports.default = ProductModels;
