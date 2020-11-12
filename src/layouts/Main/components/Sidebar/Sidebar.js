import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import StorefrontSharpIcon from '@material-ui/icons/StorefrontSharp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LocalShippingSharpIcon from '@material-ui/icons/LocalShippingSharp';
import { Profile, SidebarNav } from './components';
import AccountBalanceSharpIcon from '@material-ui/icons/AccountBalanceSharp';
import { connect } from 'react-redux';
import { getLanguageDirectionState } from 'redux-selectors';
const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Orders',
      href: '/orderslist',
      icon: <LocalShippingSharpIcon />
    },
    {
      title: 'Customers',
      href: '/customerslist',
      icon: <PeopleIcon />
    },
    {
      title: 'Products',
      href: '/productslist',
      icon: <ShoppingBasketIcon />
    },
    {
      title: 'Branches',
      href: '/brancheslist',
      icon: <StorefrontSharpIcon />
    },

    {
      title: 'Transactions',
      href: '/transactionslist',
      icon: <AccountBalanceSharpIcon />
    },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />
    }
  ];

  return (
    <Drawer
      //do not chnage languagedirection to languageDirection becasue react will give an err
      dir={props.languagedirection}
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}>
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};
const mapStateToProps = state => {
  return {
    languagedirection: getLanguageDirectionState(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
