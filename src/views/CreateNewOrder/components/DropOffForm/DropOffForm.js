import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { SearchInput, Map } from "components";

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SearchInput />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Drop off
      </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <TextField
            required
            id="customer name"
            label="Customer name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="customer phone"
            label="Phone Number"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <TextField
            required
            id="customer location"
            label="Location"
            fullWidth
          />
        </Grid>
        <Grid style={{ height: 500 }}  item xs={12} md={12}>
          <Map
           markerHeaderText="This is a header"
           markerBodyText="this is the body"
           />
        </Grid>
        <Grid item xs={12} md={12}>
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