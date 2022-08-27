import { Request, Response, NextFunction } from "express";
import Error from "../interfaces/Error.interface";

const errMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statuse = err.status || 500;
    const message = err.message || `Opps .. Something wrong `;
    res.json({
       st: statuse,
       ms: message
    })
}

export default errMiddleware;