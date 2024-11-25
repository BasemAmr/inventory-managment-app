import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Users {
  userId: string;
  name: string;
  email: string;
}

export interface Products {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
  Sales: Sales[];
  Purchases: Purchases[];
}

export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface Sales {
  saleId: string;
  productId: string;
  timestamp: Date;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  product: Products;
}

export interface Purchases {
  purchaseId: string;
  productId: string;
  timestamp: Date;
  quantity: number;
  unitCost: number;
  totalCost: number;
  product: Products;
}

export interface Expenses {
  expenseId: string;
  category: string;
  amount: number;
  timestamp: Date;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: Date;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: Date;
}

export interface ExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: Date;
  ExpenseByCategory: ExpenseByCategory[];
}

export interface ExpenseByCategory {
  expenseByCategoryId: string;
  expenseSummaryId: string;
  category: string;
  amount: bigint;
  date: Date;
  expenseSummary: ExpenseSummary;
}

export interface DashboardMetrics {
  popularProducts: Products[];
  salesSummary: SalesSummary[];
  expenseSummary: ExpenseSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseByCategorySummary: ExpenseByCategory[];
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses", "ExpensesByCategory"],
  endpoints: (builder) => ({
    getDashboardMetrics: builder.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),

    getProducts: builder.query<Products[], string>({
      query: (search: string) =>
        `/products${search ? `?search=${search}` : ""}`,
      providesTags: ["Products"],
    }),

    createProduct: builder.mutation<Products, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),

    getUsers: builder.query<Users[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    getExpenses: builder.query<Expenses[], void>({
      query: () => "/expenses",
      providesTags: ["Expenses"],
    }),

    getExpensesByCategory: builder.query<ExpenseByCategory[], void>({
      query: () => "/expenses/category",
      providesTags: ["ExpensesByCategory"],
    }),

  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useGetExpensesQuery,
  useGetExpensesByCategoryQuery,
} = api;
export default api;
