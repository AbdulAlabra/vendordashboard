import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function ItemForm() {
  const itemHeader = 'Items to Pick';
  const gridSize = {
    itemName: {
      xl: 8,
      lg: 8,
      sm: 12,
      xs: 12
    },
    price: {
      xl: 1,
      lg: 1,
      sm: 4,
      xs: 2
    },
    quantity: {
      xl: 1,
      lg: 1,
      sm: 4,
      xs: 2
    },
    SKU: {
      xl: 2,
      lg: 2,
      sm: 4,
      xs: 4
    }
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {itemHeader}
      </Typography>

      <Grid container spacing={3}>
        <Grid
          item
          xl={gridSize.itemName.xl}
          lg={gridSize.itemName.lg}
          sm={gridSize.itemName.sm}
          xs={gridSize.itemName.sm}
          >
          <TextField
            required
            id="itemName"
            name="itemName"
            label="Item name"
            fullWidth
          />
        </Grid>
        <Grid
          item
          xl={gridSize.price.xl}
          lg={gridSize.price.lg}
          sm={gridSize.price.sm}
          xs={gridSize.price.sm}
          >
          <TextField
            required
            id="Price"
            name="Price"
            label="SAR"
            type="number"
            fullWidth
          />
        </Grid>
        <Grid
          item
          xl={gridSize.quantity.xl}
          lg={gridSize.quantity.lg}
          sm={gridSize.quantity.sm}
          xs={gridSize.quantity.sm}
          >
          <TextField
            required
            id="Quantity"
            name="Quantity"
            label="Quantity"
            type="number"
            fullWidth
          />
        </Grid>
        <Grid
          item
          xl={gridSize.SKU.xl}
          lg={gridSize.SKU.lg}
          sm={gridSize.SKU.sm}
          xs={gridSize.SKU.sm}
          >
          <TextField
            id="SKU"
            name="SKU"
            label="SKU"
            type="number"
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
