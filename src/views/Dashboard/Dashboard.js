import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  PendingOrders,
  ReadyOrders,
  OnTheWayOrders,
  DeliveredOrders,
  CanceledOrders,
  ReturnedOrders,
  AccountBalance,
  LatestSales,
  UsersByDevice,
  LatestOrders
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));
const gridSizes = {
  orders: {
    xl: 4,
    lg: 4,
    sm: 6,
    xs: 12
  },
  accountBalance: {
    xl: 12,
    lg: 12,
    sm: 12,
    xs: 12
  },
  graph: {
    xl: 8,
    lg: 8,
    md: 12,
    xs: 12
  },
  chart: {
    xl: 4,
    lg: 4,
    md: 12,
    xs: 12
  },
  latestOrders: {
    xl: 12,
    lg: 12,
    md: 12,
    xs: 12
  }

}

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Grid
      container
      spacing={4}
      >

        <Grid
          item
          xl={gridSizes.orders.xl}
          lg={gridSizes.orders.lg}
          sm={gridSizes.orders.sm}
          xs={gridSizes.orders.xs}
        >
          <PendingOrders />
        </Grid>
        <Grid
          item
          xl={gridSizes.orders.xl}
          lg={gridSizes.orders.lg}
          sm={gridSizes.orders.sm}
          xs={gridSizes.orders.xs}
        >
          <ReadyOrders />
        </Grid>
        <Grid
          item
          xl={gridSizes.orders.xl}
          lg={gridSizes.orders.lg}
          sm={gridSizes.orders.sm}
          xs={gridSizes.orders.xs}
        >
          <OnTheWayOrders />
        </Grid>

        <Grid
          item
          xl={gridSizes.orders.xl}
          lg={gridSizes.orders.lg}
          sm={gridSizes.orders.sm}
          xs={gridSizes.orders.xs}
        >
          <CanceledOrders />
        </Grid>
        <Grid
          item
          xl={gridSizes.orders.xl}
          lg={gridSizes.orders.lg}
          sm={gridSizes.orders.sm}
          xs={gridSizes.orders.xs}
        >
          <ReturnedOrders />
        </Grid>
        <Grid
          item
          xl={gridSizes.orders.xl}
          lg={gridSizes.orders.lg}
          sm={gridSizes.orders.sm}
          xs={gridSizes.orders.xs}
        >
          <DeliveredOrders />
        </Grid>
        <Grid
          item
          xl={gridSizes.accountBalance.xl}
          lg={gridSizes.accountBalance.lg}
          sm={gridSizes.accountBalance.sm}
          xs={gridSizes.accountBalance.xs}
        >
          <AccountBalance />
        </Grid>
        <Grid
          item
          xl={gridSizes.latestOrders.xl}
          lg={gridSizes.latestOrders.lg}
          md={gridSizes.latestOrders.md}
          xs={gridSizes.latestOrders.xs}
        >
          <LatestOrders />
        </Grid>

        <Grid
          item
          xl={gridSizes.graph.xl}
          lg={gridSizes.graph.lg}
          md={gridSizes.graph.md}
          xs={gridSizes.graph.xs}
        >
          <LatestSales />
        </Grid>
        <Grid
          item
          xl={gridSizes.chart.xl}
          lg={gridSizes.chart.lg}
          md={gridSizes.chart.md}
          xs={gridSizes.chart.xs}
        >
          <UsersByDevice />
        </Grid>
    
      </Grid>


    </div>
  );
};

export default Dashboard;
