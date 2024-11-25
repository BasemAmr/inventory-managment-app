"use client";

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, Filter, PieChart, TrendingDown, X } from "lucide-react";
import { useGetExpensesQuery, useGetExpensesByCategoryQuery } from "@/state/api";
import { PieChart as RePieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Types
type Expense = {
  expenseId: string;
  category: string;
  amount: number;
  timestamp: Date;
};


type ExpenseByCategory = {
  category: string;
  amount: bigint;
  date: Date;
};

type FilterState = {
  startDate: Date;
  endDate: Date;
  category: string;
  minAmount?: number;
  maxAmount?: number;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const ExpensesView = () => {
  // State
  const [filters, setFilters] = useState<FilterState>({
    startDate: new Date('2021-01-01'),
    endDate: new Date(),
    category: 'all'
  });
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Queries
  const { data: expenses } = useGetExpensesQuery();
  const { data: expensesByCategory } = useGetExpensesByCategoryQuery();


  // Memoized calculations
  const filteredExpenses = useMemo(() => {
    if (!expenses) return [];
    
    return expenses.filter((expense: Expense) => {
      const expenseDate = new Date(expense.timestamp);
      const meetsDateRange = expenseDate >= filters.startDate && expenseDate <= filters.endDate;
      const meetsCategory = filters.category === 'all' || expense.category === filters.category;
      const meetsMinAmount = !filters.minAmount || expense.amount >= filters.minAmount;
      const meetsMaxAmount = !filters.maxAmount || expense.amount <= filters.maxAmount;
      
      return meetsDateRange && meetsCategory && meetsMinAmount && meetsMaxAmount;
    });
  }, [expenses, filters]);
  console.log(filteredExpenses);
  console.log(filters);

  const pieChartData = useMemo(() => {
    if (!expensesByCategory) return [];
    
    return Object.entries(
      expensesByCategory.reduce((acc: Record<string, number>, curr: ExpenseByCategory) => {
        acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
        return acc;
      }, {})
    ).map(([category, amount]) => ({
      category,
      amount,
      value: amount // Required for Recharts
    }));
  }, [expensesByCategory]);

  const totalExpenses = useMemo(() => {
    return filteredExpenses.reduce((sum: number, expense: Expense) => sum + expense.amount, 0);
  }, [filteredExpenses]);

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border">
          <p className="font-semibold">{data.category}</p>
          <p className="text-gray-600">
            Amount: ${data.amount.toLocaleString()}
          </p>
          <p className="text-gray-500">
            {((data.amount / totalExpenses) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Expenses Dashboard</h1>
          <p className="text-gray-500">Track and analyze your spending patterns</p>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => {/* Add expense modal logic */}}
        >
          <DollarSign className="w-4 h-4" />
          Add Expense
        </button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <input
                type="date"
                value={filters.startDate.toISOString().split('T')[0]}
                onChange={(e) => setFilters(prev => ({ ...prev, startDate: new Date(e.target.value) }))}
                className="border rounded-md px-2 py-1"
              />
              <span>to</span>
              <input
                type="date"
                value={filters.endDate.toISOString().split('T')[0]}
                onChange={(e) => setFilters(prev => ({ ...prev, endDate: new Date(e.target.value) }))}
                className="border rounded-md px-2 py-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="border rounded-md px-2 py-1"
              >
                <option value="all">All Categories</option>
                {pieChartData.map(({ category }) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            {filters.category !== 'all' && (
              <button
                onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" /> Clear filter
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Expenses by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    onMouseEnter={(_, index) => setHoveredCategory(pieChartData[index].category)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={entry.category}
                        fill={COLORS[index % COLORS.length]}
                        opacity={hoveredCategory === null || hoveredCategory === entry.category ? 1 : 0.6}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Expenses List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              Recent Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {filteredExpenses.map((expense: Expense) => (
                <div
                  key={expense.expenseId}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{expense.category}</p>
                    <p className="text-sm text-gray-500">
                      {(new Date(expense.timestamp)).toISOString().split('T')[0]}
                    </p>
                  </div>
                  <p className="font-semibold">${expense.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpensesView;