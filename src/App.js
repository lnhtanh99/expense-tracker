import React from 'react';

import { Grid } from '@material-ui/core';
import Details from './components/Details/Details';
import Main from './components/Main/Main';

import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';

import useStyles from './styles';

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Grid
        className={classes.grid}
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
        style={{ height: '100vh' }}
      >
        <Grid item sm={12} md={4}>
          <Main />
        </Grid>
        <Grid item sm={9} md={3}>
          <Details title="Income" />
        </Grid>
        <Grid item sm={9} md={3}>
          <Details title="Expense" />
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton/>
        <ErrorPanel/>
      </PushToTalkButtonContainer>
    </div>
  );
}

export default App;
