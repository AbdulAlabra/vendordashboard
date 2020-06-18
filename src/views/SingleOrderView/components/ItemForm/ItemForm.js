import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function ItemForm() {
  const itemHeader = "Items to Pick";
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {itemHeader}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="itemName"
            name="itemName"
            label="Item name"
            fullWidth
          />
        </Grid>
      
        <Grid item xs={12} sm={2}>
          <TextField
            required
            id="Price"
            name="Price"
            label="SAR"
            type="number"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            required
            id="Quantity"
            name="Quantity"
            label="Quantity"
            type="number"
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
   
    </React.Fragment>
  );
}