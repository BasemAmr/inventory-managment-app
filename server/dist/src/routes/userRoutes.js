"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const userRoute = (0, express_1.Router)();
userRoute.get('/', userControllers_1.getUsers);
exports.default = userRoute;
