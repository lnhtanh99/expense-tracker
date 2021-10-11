import React from 'react'
import { Card, CardContent, CardHeader, Typography, Grid, Divider } from "@material-ui/core"
import useStyles from './styles';

import Form from './Form/Form';
import List from './List/List';

function Main() {
    const classes = useStyles();
    return (
        <Card>
            <CardHeader 
                title="Expense Tracker" 
                subheader="Powered by Speechly"
            />
            <CardContent>
                <Typography align="center" variant="h5">Total balance $100</Typography>
                <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '20px'}}>
                    Try saying: Add income for $100 in Category Salary for next Monday...
                </Typography>
                <Divider className={classes.divider}/>
                <Form/>
                <CardContent className={classes.cardContent}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <List/>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardContent>
        </Card>
    )
}

export default Main
