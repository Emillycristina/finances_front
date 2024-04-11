import {
  FormControl,
  Grid,
  Card,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import authService from "../../Services/useAuth";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

const Form = () => {
  const userId = authService.getUserIdFromCookies();




  const [values, setValues] = useState({
    descricao: "",
    valor: 0,
    tipo: "",
    data: null,
    userId: userId,
  });

  

  const handleFlagClick = (event) => {
    const selectedType = event.target.value;
    setValues({ ...values, tipo: selectedType });
    
  };


  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).locale("pt-br").format("DD/MM/YYYY");
  
    setValues({
      ...values,
      data: formattedDate,
    });
  }

  const handleSubmit = async () => {

 
  const token = authService.getTokenFromCookies();

  // Log dos valores de userId e token
  console.log('userId:', userId);
  console.log('token:', token);

    try {
      
      const response = await fetch("https://apifinances.onrender.com/moviments", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${authService.getTokenFromCookies()}`
        },
        body: JSON.stringify(values),
      });
     

      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage || 'Erro ao enviar dados para a API');
      }
      setValues({
        descricao: "",
        valor: 0,
        tipo: "",
        data: null,
        userId: userId,
      });
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error.message);
      
    }
  };


  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginLeft: '5px'}}>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        sx={{ 
        background: "rgb(255, 255, 255, 0.8)", 
        border:'solid 0.5px #e5e5e7', 
        width:'70%', 
        borderRadius:'4px', 
        paddingBottom:'5px' }}
      >
        <Grid item xs={8} sm={3} md={2}>
          <FormControl>
            <TextField
              required
              label="Descrição"
              onChange={(e) =>
                setValues({ ...values, descricao: e.target.value })
              }
              variant="outlined"
              size="small"
            />
          </FormControl>
        </Grid>
        <Grid item xs={8} sm={3} md={2}>
          <FormControl>
            <TextField
              required
              onChange={(e) =>
                setValues({ ...values, valor: parseFloat(e.target.value) || 0 })
              }
              label="Valor"
              variant="outlined"
              size="small"
            />
            
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={3} md={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="D/M/YYYY"
                variant="standard"
                onChange={handleDateChange}
                slotProps={{ textField: { size: "small" } }}
              />
            </LocalizationProvider>
          
        </Grid>
        <Grid item>
          <FormControl>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <FormGroup>
                  <FormControlLabel
                    
                    value="entrada"
                    control={<Checkbox checked={values.tipo === 'entrada'} onChange={handleFlagClick} />}
                    label="Entrada"
                  />
                </FormGroup>
              </Grid>

              <Grid item>
                <FormGroup>
                  <FormControlLabel
                    value="saida"
                    control={<Checkbox checked={values.tipo === 'saida'} onChange={handleFlagClick} />}
                    label="Saída"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>

        <Grid item>
          <Card>
            <FormControl>
              <Button
                variant="contained"
                sx={{ height: "35px" }}
                onClick={handleSubmit}
                
              >
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
