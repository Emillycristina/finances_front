import {
  FormControl,
  Grid,
  Card,
  InputAdornment,
  Input,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React from "react";

const Form = () => {
  return (
    <div>
    <Grid container spacing={1} justifyContent="center" sx={{ marginTop: '3px' }}>
      <Grid item>
        <Card>
          <FormControl>
            <TextField
              required
              id="standard-required"
              label="Descrição"
              variant="standard"
            />
          </FormControl>
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <FormControl>
            <Input
              id="standard-adornment-amount"
              label='Valor'
              startAdornment={
                <InputAdornment position="start">R$</InputAdornment>
              }
              sx={{height:'48px'}}
            />
          </FormControl>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{height:'48px'}}>
          <FormControl>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Entrada"
                  />
                </FormGroup>
              </Grid>
              <Grid item>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Saída"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </FormControl>
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <FormControl>
            <Button variant='contained' sx={{height:'48px'}}>Adicionar</Button>
          </FormControl>
        </Card>
      </Grid>
    </Grid>
  </div>
  )
};



export default Form;
