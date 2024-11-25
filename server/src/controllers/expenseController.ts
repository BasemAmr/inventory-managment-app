import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getExpenseByCategory = async (req: Request, res: Response) => {
    try {
        const expenseByCategoryRaw = await prisma.expenseByCategory.findMany({
        orderBy: {
            date: "desc",
        },
        });
        const expenseByCategorySummary = expenseByCategoryRaw.map((item) => {
        return {
            ...item,
            amount: item.amount.toString(),
        };
        });
    
        res.status(200).json(expenseByCategorySummary);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the expense by category" });
    }
};

const getExpenses = async (req: Request, res: Response) => {
    try {
        const expenses = await prisma.expenses.findMany({
        orderBy: {
            timestamp: "desc",
        },
        });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the expenses" });
    }
}


export {
    getExpenses,
    getExpenseByCategory,
};