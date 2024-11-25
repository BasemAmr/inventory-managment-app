"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const productRoutes = (0, express_1.Router)();
productRoutes.get("/", productController_1.getProducts);
productRoutes.post("/", productController_1.createProduct);
exports.default = productRoutes;
