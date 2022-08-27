import { Request, Response, NextFunction, json } from 'express';
import ProductModels from '../models/product.models'
import config from '../configration'
import jwt from 'jsonwebtoken'

const produt = new ProductModels()


export const creat = async (req: Request, res: Response,next:NextFunction) => {
    try {
        
        const pro = await produt.creat(req.body)
        res.json({
            "state": "success",
            data:{...pro},
            message :"Product created succesfly"
        })
    } catch (err) {
        next(err)
    }
}


export const GetAllProducts = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const allProduct = await produt.getAllProducts();
        let size = Object.keys(allProduct as object).length
        if (size > 0) {
            res.json({
                state: "success",
                data: { ...allProduct },
                message: "This Is All Products",
            });
        } else {
            res.json({
                message:"Sorry Not Found Eny Product..."
            })
        }
    } catch (err) {
        next(err)
    }
}

export const DeleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletItime = await produt.deleteProduct(req.params)
        res.json({
            status: "Success",
            data:{...deletItime},
            message:"Delete Itime Successfly"
        })
    }
    catch (err) {
        next(err)
    }
}

export const GetProductByItsId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const SpecificProduct = await produt.getSpecificProduct(req.params);
        res.json({
            data: {...SpecificProduct },
            status: "Success"
        })
    }
    catch (err) {
        next(err)
    }
}

export const UpdateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const UpdateProd = await produt.updateProduct(req.body);
        res.json({
            state: "success",
            data:{...UpdateProd}
        })
    }
    catch (err) {
        next(err)
    }
}

export const DeleteAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const DelAllPro = await produt.deleteAllProducts();
        res.json({
            status: "Done",
            message: "All Products Deleted Done",
            data:{...DelAllPro}
        })
    }
    catch (err) {
        next(err)
    }
}

export const Authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const { password, email } = req.body;
        const auth_pro = await produt.authentication(password, email);
        const token = jwt.sign({ auth_pro }, config.token as string);

        if (!auth_pro) {
            res.json({
                messsage:"User Not Valide"
            })
        }
        res.json({
           data:{...auth_pro, token}
        })
    } catch (error) {
        next(error)
    }
}