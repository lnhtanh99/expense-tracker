import React from 'react'
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { Pie } from 'react-chartjs-2';
import useTransactions from '../../useTransactions';

import useStyles from './styles';

function Details({ title }) {
    const classes = useStyles();
    const { total, chartData } = useTransactions(title);

    return (
        <div className={classes.root}>
            <Card className={title === 'Income' ? classes.income : classes.expense}>
                <CardHeader title={title} />
                <CardContent >
                    <Typography variant="h5">${total}</Typography>
                    <Pie 
                        data={chartData}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default Details
