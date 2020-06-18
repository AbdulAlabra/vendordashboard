import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Map } from 'components';

export default function BranchLocationFrom() {
  const gridSize = {
    branchName: {
      xl: 6,
      lg: 6,
      sm: 6,
      xs: 6
    },
    branchId: {
      xl: 6,
      lg: 6,
      sm: 6,
      xs: 6
    },
    locationAddress: {
      xl: 12,
      lg: 12,
      sm: 12,
      xs: 12
    },
    Map: {
      xl: 12,
      lg: 12,
      sm: 12,
      xs: 12
    }
  };
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
      <Grid 
        item
        xl={gridSize.branchName.xl}
        lg={gridSize.branchName.lg}
        sm={gridSize.branchName.sm}
        xs={gridSize.branchName.sm}
          >
          <TextField
            required
            id="branchName"
            name="branchName"
            label="Branch Name"
            fullWidth
          />
        </Grid>
        <Grid 
        item
        xl={gridSize.branchId.xl}
        lg={gridSize.branchId.lg}
        sm={gridSize.branchId.sm}
        xs={gridSize.branchId.sm}
          >
          <TextField
            id="branchId"
            name="branchId"
            label="Branch ID"
            fullWidth
          />
        </Grid>
        <Grid 
        item
        xl={gridSize.locationAddress.xl}
        lg={gridSize.locationAddress.lg}
        sm={gridSize.locationAddress.sm}
        xs={gridSize.locationAddress.sm}
          >
          <TextField
            required
            id="locationAddress"
            name="locationAddress"
            label="Location Address"
            fullWidth
          />
        </Grid>
        <Grid
          style={{ height: 500 }}
          item
          xl={gridSize.Map.xl}
          lg={gridSize.Map.lg}
          sm={gridSize.Map.sm}
          xs={gridSize.Map.sm}
          >
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
