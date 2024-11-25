import { Router } from "express";
import { getProducts, createProduct } from "../controllers/productController";

const productRoutes = Router();
productRoutes.get("/", getProducts);
productRoutes.post("/", createProduct);



export default productRoutes;