import React, { useState, useEffect, useContext } from 'react';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import { useSpeechContext } from '@speechly/react-client';

import { v4 as uuidv4 } from 'uuid';

import { ExpenseTrackerContext } from '../../../context/context';
import { incomeCategories, expenseCategories } from '../../../constants/categories';

import useStyles from './styles';

const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: '',
}

function Form() {
    const classes = useStyles();
    const [formData, setFormData] = useState(initialState);
    const { addTransaction } = useContext(ExpenseTrackerContext);
    const { segment } = useSpeechContext();

    const createTransaction = () => {
        const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4() }

        addTransaction(transaction);
        setFormData(initialState);
    }

    useEffect(() => {
        if (segment) {
            if (segment.intent.intent === 'add_expense') {
                setFormData({ ...formData, type: 'Expense' });
            } else if (segment.intent.intent === 'add_income') {
                setFormData({ ...formData, type: 'Income' });
            } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
                return createTransaction();
            } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
                return setFormData(initialState);
            }

            segment.entities.forEach((s) => {
                const category = `${s.value.charAt(0)}${s.value.slice(1).toLowerCase()}`;

                switch (s.type) {
                    case 'amount':
                        setFormData({ ...formData, amount: s.value });
                        break;
                    case 'category':
                        if (incomeCategories.map((iC) => iC.type).includes(category)) {
                            setFormData({ ...formData, type: 'Income', category });
                        } else if (expenseCategories.map((iC) => iC.type).includes(category)) {
                            setFormData({ ...formData, type: 'Expense', category });
                        }
                        break;
                    case 'date':
                        setFormData({ ...formData, date: s.value });
                        break;
                    default:
                        break;
                }
            });

            if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
                createTransaction();
            }
        }
    }, [segment ]);


    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    {segment &&
                        segment.words.map(word => word.value).join(" ")
                    }
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>
                        Category
                    </InputLabel>
                    <Select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        {selectedCategories.map((category) => (
                            <MenuItem
                                value={category.type}
                                key={category.type}
                            >
                                {category.type}
                            </MenuItem>
                        ))
                        }


                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    type="number"
                    label="Amount"
                    fullWidth
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    type="date"
                    label=" "
                    fullWidth
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
            </Grid>
            <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                fullWidth
                onClick={createTransaction}
            >
                Create
            </Button>
        </Grid>
    )
}

export default Form
