import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function ItemForm() {
  const itemHeader = 'Pick up Instructions';
  const gridSize = {
    instructions: {
      xl: 12,
      lg: 12,
      sm: 12,
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
          xl={gridSize.instructions.xl}
          lg={gridSize.instructions.lg}
          sm={gridSize.instructions.sm}
          xs={gridSize.instructions.sm}
          >
          <TextField
            id="instructions"
            name="instructions"
            label="Instructions"
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
