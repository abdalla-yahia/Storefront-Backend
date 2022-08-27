import { Router} from "express";
import * as control from '../../controllers/product.controller';
import validateTokenmidlware from "../../interfaces/auth.middleware";


const routes = Router()

routes.post("/product", control.creat);
routes.put("/product/up", validateTokenmidlware, control.UpdateProduct);
routes.get("/product/:id", validateTokenmidlware, control.GetProductByItsId);
routes.get("/all", validateTokenmidlware, control.GetAllProducts);
routes.all("/all/:id", validateTokenmidlware, control.DeleteProduct);
routes.delete("/del", validateTokenmidlware, control.DeleteAllProducts);
routes.post('/auth',control.Authentication)


export default routes;
