import { NextFunction ,Response, Request} from 'express';
import Error from './Error.interface';
import jwt from 'jsonwebtoken';
import config from '../configration';


const authErrorValidate = (next: NextFunction) => {
    const error: Error = new Error("Logining Faild :Please Try Again");
    error.status = 401
    next(error)
}

const validateToken = async (req: Request, _res: Response, next: NextFunction)=> {
    try {
        
        const auth = req.get('Authorization');
        
        if (auth) {
            const barer = auth.split(' ')[0];
            const token = auth.split(' ')[1];
           
            if (token && barer === 'Bearer') {
                
                const decode = jwt.verify(token, config.token as string)
                if (decode) {
                   next()
                } else {
                    authErrorValidate(next); 
                }
            } else {
                 authErrorValidate(next); 
            }
        } else {
           authErrorValidate(next); 
       }
    } catch (error) {
        authErrorValidate(next);
    }
}
export default validateToken;