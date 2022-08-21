/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request,Response,NextFunction } from "express"
import Error from "../interfaces/Error.interface"

const errorMidlware = (error: Error, req: Request, res: Response, nxt: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || "No way !! Page Not Found !!"
    res.status(status).json({ status, message })
};

export default errorMidlware;