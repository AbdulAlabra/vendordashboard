import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function CustomerInfoForm() {
  const itemHeader = 'Items to Pick';
  const gridSize = {
    customerFirstName: {
      xl: 4,
      lg: 4,
      sm: 4,
      xs: 12
    },
    customerSecondName: {
      xl: 4,
      lg: 4,
      sm: 4,
      xs: 12
    },
    phone: {
      xl: 4,
      lg: 4,
      sm: 4,
      xs: 12
    },

  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {itemHeader}
      </Typography>

      <Grid container spacing={3}>
        <Grid
          item
          xl={gridSize.customerFirstName.xl}
          lg={gridSize.customerFirstName.lg}
          sm={gridSize.customerFirstName.sm}
          xs={gridSize.customerFirstName.xs}
          >
          <TextField
            required
            id="customerFirstName"
            name="customerFirstName"
            label="First Name"
            fullWidth
          />
        </Grid>
        <Grid
          item
          xl={gridSize.customerSecondName.xl}
          lg={gridSize.customerSecondName.lg}
          sm={gridSize.customerSecondName.sm}
          xs={gridSize.customerSecondName.xs}
          >
          <TextField
            required
            id="customerSecondName"
            name="customerSecondName"
            label="Second Name"
            type="text"
            fullWidth
          />
        </Grid>
        <Grid
          item
          xl={gridSize.phone.xl}
          lg={gridSize.phone.lg}
          sm={gridSize.phone.sm}
          xs={gridSize.phone.xs}
          >
          <TextField
            required
            id="phone"
            name="phone"
            label="phone"
            type="number"
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
