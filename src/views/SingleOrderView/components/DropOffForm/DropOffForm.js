import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { SearchInput, Map } from 'components';

export default function PaymentForm() {
  const gridSize = {
    customerName: {
      xl: 4,
      lg: 4,
      sm: 4,
      xs: 7
    },
    customerPhone: {
      xl: 2,
      lg: 2,
      sm: 2,
      xs: 5
    },
    customerLocation: {
      xl: 6,
      lg: 6,
      sm: 6,
      xs: 12
    },
    instructions: {
      xl: 12,
      lg: 12,
      sm: 12,
      xs: 12
    }
  };
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {/* <Grid item xs={12}>
          <SearchInput />
        </Grid> */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Drop off - Customer Location
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid
          item
          xl={gridSize.customerName.xl}
          lg={gridSize.customerName.lg}
          sm={gridSize.customerName.sm}
          xs={gridSize.customerName.xs}>
          <TextField
            required
            id="customer name"
            label="Customer name"
            fullWidth
          />
        </Grid>
        <Grid
          item
          xl={gridSize.customerPhone.xl}
          lg={gridSize.customerPhone.lg}
          sm={gridSize.customerPhone.sm}
          xs={gridSize.customerPhone.xs}>
          <TextField
            required
            id="customer phone"
            label="Phone Number"
            fullWidth
          />
        </Grid>
        <Grid
          item
          xl={gridSize.customerLocation.xl}
          lg={gridSize.customerLocation.lg}
          sm={gridSize.customerLocation.sm}
          xs={gridSize.customerLocation.xs}>
          <TextField
            required
            id="customer location"
            label="Location"
            fullWidth
          />
        </Grid>
        <Grid style={{ height: 500 }} item xs={12} md={12}>
          <Map
            markerHeaderText="This is a header"
            markerBodyText="this is the body"
          />
        </Grid>
        <Grid
          item
          xl={gridSize.instructions.xl}
          lg={gridSize.instructions.lg}
          sm={gridSize.instructions.sm}
          xs={gridSize.instructions.xs}>
          <TextField
            id="Instructions"
            label="Drop off Instructions"
            fullWidth
          />
        </Grid>
     
      </Grid>
    </React.Fragment>
  );
}

/* <Grid item xs={12} md={6}>
        <TextField
          required
          id="cvv"
          label="CVV"
          helperText="Last three digits on signature strip"
          fullWidth
          autoComplete="cc-csc"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox color="secondary" name="saveCard" value="yes" />}
          label="Remember credit card details for next time"
        />
      </Grid>
     */
