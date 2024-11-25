import { ExpenseByCategory, useGetDashboardMetricsQuery } from "@/state/api";
import { Loader } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

type ExpenseSums = {
    [category: string]: number;
  };

const ExpenseSummaryCard = () => {
    const { data, isLoading } = useGetDashboardMetricsQuery();

    
    // Format expense data for pie chart
    const expensesByCategoryData = data?.expenseByCategorySummary || [];
    const expensesSum = expensesByCategoryData.reduce((acc: ExpenseSums, item: ExpenseByCategory) => {
        const category = item.category + " Expense";
        const amount = parseInt(item.amount.toString());
        acc[category] = (acc[category] || 0) + amount;
        return acc;
    }, {});

    console.log(expensesSum);
    
    const chartData = Object.entries(expensesSum).map(([name, value]) => ({
        name,
        value
    }));
    
    const totalExpenses = chartData.reduce((sum, item) => sum + item.value, 0);
    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-full'>
                <Loader className="animate-spin" size={32} />
            </div>
        );
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 row-span-1 col-span-1 md:row-span-3 flex flex-col h-full overflow-auto">
            <h2 className="text-2xl font-bold text-gray-800">Expense Summary</h2>
            <div className="h-px bg-gray-200 w-full my-4" />

            <div className="flex-grow relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius="60%"
                            outerRadius="80%"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            formatter={(value: number) => `$${value.toLocaleString()}`}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center total */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-gray-500 text-base/3">Total Expenses</p>
                    <p className="text-2xl/5 font-bold">${(totalExpenses).toFixed(2)}</p>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-6 space-y-2">
                {chartData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-sm text-gray-600">{entry.name}</span>
                        </div>
                        <span className="text-sm font-medium">
                            ${(entry.value).toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseSummaryCard;