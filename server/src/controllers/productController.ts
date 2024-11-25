import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  try {
    const searchParams = req.query.search?.toString();
    const products = await prisma.products.findMany({
        where: {
            name: {
                contains: searchParams,
                mode: "insensitive",
            },
        }
    });
    res.json(products);
  }
    catch (error) {
        res.status(500).json({ error: "Error fetching products from database." });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { productId, name, price, rating, stockQuantity } = req.body;
        
        
        const data = {
            productId,
            rating,
            stockQuantity,
            name,
            price,

        };

        const product = await prisma.products.create({
            data,
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: "Error creating product." });
    }
}