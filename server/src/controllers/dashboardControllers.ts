import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
    req: Request,
    res: Response
) => {
  try {
    const popularProducts = await prisma.products.findMany({
        take: 15,   
        orderBy: {
            stockQuantity: 'desc'
        }
    });

    const salesSummary = await prisma.salesSummary.findMany({
        take: 5,
        orderBy: {
            date: 'desc'
        }
    });
    const purchaseSummary = await prisma.purchaseSummary.findMany({
        take: 5,
        orderBy: {
            date: 'desc'
        }
    });
    const expenseSummary = await prisma.expenseSummary.findMany({
        take: 5,
        orderBy: {
            date: 'desc'
        }
    });
    const expenseByCategoryRaw = await prisma.expenseByCategory.findMany({
        take: 5,
        orderBy: {
            date: 'desc'
        }
    });
    const expenseByCategorySummary = expenseByCategoryRaw.map((item) => {
        return {
            ...item,
            amount: item.amount.toString()
        }
    });


    res.status(200).json({ 
        popularProducts,
        salesSummary,
        purchaseSummary,
        expenseSummary,
        expenseByCategorySummary
     });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the dashboard" });
  }
};