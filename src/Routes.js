import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  // views
  Dashboard,
  OrdersList,
  CustomersList,
  ProductList,
  BranchesList,
  TransactionsList,
  Account,
  Settings,
  CreateNewOrder,
  CreateNewProduct,
  Map,
  SignUp,
  SignIn,
  NotFound
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <RouteWithLayout
        component={Dashboard}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={OrdersList}
        exact
        layout={MainLayout}
        path="/orders"
      />
      <RouteWithLayout
        component={CustomersList}
        exact
        layout={MainLayout}
        path="/customers"
      />
      <RouteWithLayout
        component={ProductList}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={BranchesList}
        exact
        layout={MainLayout}
        path="/branches"
      />
      <RouteWithLayout
        component={TransactionsList}
        exact
        layout={MainLayout}
        path="/transactions"
      />
      <RouteWithLayout
        component={Account}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={Settings}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={CreateNewOrder}
        exact
        layout={MainLayout}
        path="/neworder"
      />
      <RouteWithLayout
        component={CreateNewProduct}
        exact
        layout={MainLayout}
        path="/newproduct"
      />
      <RouteWithLayout component={Map} exact layout={MainLayout} path="/map" />
      <RouteWithLayout
        component={SignUp}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignIn}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFound}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
