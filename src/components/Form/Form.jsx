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
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormContext } from '../../js/FormContext';
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

const Form = () => {
  const { onAddRow } = useFormContext();

  const [values, setValues] = useState({
    descricao: "",
    valor: 0,
    tipo: "",
    data: null,
  });

  const handleFlagClick = (flag) => {
    setValues({
      ...values,
      tipo: flag,
    });
  };

  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).locale("pt-br").format("DD/MM/YYYY");
  
    setValues({
      ...values,
      data: formattedDate,
    });
  }

  const handleSubmit = async () => {
    try {
      // Faça a chamada à API para enviar os dados
      const response = await fetch('sua-url-da-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar dados para a API');
      }

      // Se a chamada à API for bem-sucedida, adicione a linha à tabela
      const newRow = await response.json();
      onAddRow(newRow);

      // Limpa os campos do formulário
      setValues({
        descricao: "",
        valor: 0,
        tipo: "",
        data: null,
      });
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error.message);
      // Trate o erro conforme necessário (exibindo mensagem de erro, etc.)
    }
  };;

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
                    onClick={() => handleFlagClick("entrada")}
                    control={<Checkbox defaultChecked />}
                    label="Entrada"
                  />
                </FormGroup>
              </Grid>

              <Grid item>
                <FormGroup>
                  <FormControlLabel
                    onClick={() => handleFlagClick("saida")}
                    control={<Checkbox defaultChecked />}
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
