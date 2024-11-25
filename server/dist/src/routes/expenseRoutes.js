"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expenseController_1 = require("../controllers/expenseController");
const expenseRoutes = (0, express_1.Router)();
expenseRoutes.get("/", expenseController_1.getExpenses);
expenseRoutes.get("/category", expenseController_1.getExpenseByCategory);
exports.default = expenseRoutes;
