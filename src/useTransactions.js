import { useContext } from "react";

import { ExpenseTrackerContext } from "./context/context";
import { incomeCategories, expenseCategories, resetCategories } from "./constants/categories";

const useTransactions = (title) => {
    resetCategories();
    const { transactions } = useContext(ExpenseTrackerContext);

    const transactionsPerType = transactions.filter(transaction => transaction.type === title);
    const total = transactionsPerType.reduce((total, category) => total += category.amount, 0);
    const categories = title === "Income" ? incomeCategories : expenseCategories;

    transactionsPerType.forEach((transaction) => {
        const category = categories.find((category) => category.type === transaction.category);
        if(category) category.amount += transaction.amount;
    });

    const filteredCategory = categories.filter((category) => category.amount > 0);

    const chartData = {
        datasets: [{
            data: filteredCategory.map(category => category.amount),
            backgroundColor: filteredCategory.map(category => category.color)
        }],
        labels: filteredCategory.map(category => category.type)
    }

    return { total, chartData }
}

export default useTransactions;