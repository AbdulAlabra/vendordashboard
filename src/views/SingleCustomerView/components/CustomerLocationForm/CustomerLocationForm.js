import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Map } from 'components';

export default function CustomerLocationForm() {
  const pickupHeader = 'From Branch';
  const handleButtonClick = () => {
    console.log('Hello Pick up form');
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {pickupHeader}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="customerLocation"
            name="customerLocation"
            label="Customer Location"
            fullWidth
          />
        </Grid>
        <Grid style={{ height: 500 }} item xs={12} md={12}>
          <Map
            mapBorderRadius={10}
            markerLabel="Branch X"
            onButtonClick={() => handleButtonClick()}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
