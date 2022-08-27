import { Router, Request, Response, NextFunction } from "express";
import productsRoutes from "./api/products.routes";

const routes = Router();

routes.use("/api", productsRoutes);

export default routes;
