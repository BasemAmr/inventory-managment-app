"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpenseByCategory = exports.getExpenses = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getExpenseByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenseByCategoryRaw = yield prisma.expenseByCategory.findMany({
            orderBy: {
                date: "desc",
            },
        });
        const expenseByCategorySummary = expenseByCategoryRaw.map((item) => {
            return Object.assign(Object.assign({}, item), { amount: item.amount.toString() });
        });
        res.status(200).json(expenseByCategorySummary);
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the expense by category" });
    }
});
exports.getExpenseByCategory = getExpenseByCategory;
const getExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenses = yield prisma.expenses.findMany({
            orderBy: {
                timestamp: "desc",
            },
        });
        res.status(200).json(expenses);
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the expenses" });
    }
});
exports.getExpenses = getExpenses;
