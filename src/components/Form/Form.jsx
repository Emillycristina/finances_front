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
  CardContent,
} from "@mui/material";
import React from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const Form = () => {
  return (
    <div>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        sx={{ marginTop: "5px" }}
      >
        <Grid item xs={3} sm={3} md={2}>
          <Card>
            <FormControl>
              <TextField
                required
                label="Descrição"
                variant="standard"
                sx={{ width: "100px", height:'52px', backgroundColor: 'rgb(255, 255, 255, 0.8)' }}
              />
            </FormControl>
          </Card>
        </Grid>
        <Grid item xs={3} sm={3} md={2}>
          <Card>
            <FormControl>
              <Input
                id="standard-adornment-amount"
                label="Valor"
                startAdornment={
                  <InputAdornment position="start">R$</InputAdornment>
                }
                sx={{ height: "52px", backgroundColor: 'rgb(255, 255, 255, 0.8)' }}
              />
            </FormControl>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ height: "52px",backgroundColor: 'rgb(255, 255, 255, 0.8)'}}>
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
          
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <DatePicker
                    label="Data"
                    format="D/M/YYYY"
                    sx={{ backgroundColor: 'rgb(255, 255, 255, 0.8)', width:'138px'}}
                  />
                
              </LocalizationProvider>
            
          </Grid>
        <Grid item>
          <Card>
            <FormControl>
              <Button variant="contained" sx={{ height: "52px" }}>
                {" "}
                Adicionar{" "}
              </Button>
            </FormControl>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Form;
