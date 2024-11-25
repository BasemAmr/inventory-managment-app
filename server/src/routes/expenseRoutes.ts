import { Router } from "express";
import  
    { getExpenses, getExpenseByCategory }
from "../controllers/expenseController";

const expenseRoutes = Router();


expenseRoutes.get("/", getExpenses);
expenseRoutes.get("/category", getExpenseByCategory);

export default expenseRoutes;

