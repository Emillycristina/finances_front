import {
  Box,
  TextField,
  Avatar,
  IconButton,
  Button,
  Input,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { MdAddAPhoto } from "react-icons/md";



export const FormUser = () => {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState({
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
  });

  const [imagemPerfil, setImagemPerfil] = useState(null);
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const estadosBrasileiros = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  const handleImagemPerfilChange = (e) => {
    const arquivo = e.target.files[0];

    if (arquivo) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagemPerfil(e.target.result);
      };
      reader.readAsDataURL(arquivo);
    }
  };

  const handleCepChange = (e) => {
    const cepNovo = e.target.value;

    if (cepNovo.length === 8) {
      fetch(`https://viacep.com.br/ws/${cepNovo}/json/`)
        .then((response) => response.json())
        .then((data) => {
          setEndereco({
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            uf: data.uf,
          });
          setEstadoSelecionado(data.uf); 
        })
        .catch(error => {
          console.error('Erro ao buscar CEP', error)
        })
        
      }
     setCep(cepNovo)
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        marginTop: "30px",
        marginLeft:"50px",
       
      }}
    >
      <Avatar
        alt="Usuário"
        src={imagemPerfil}
        sx={{
          width: "10rem",
          height: "10rem",
          position: "relative",
          zIndex: 0,
        }}
      >
        <Input
          type="file"
          accept="image/*"
          onChange={handleImagemPerfilChange}
          style={{ display: "none" }}
          id="input-foto"
        />
        <label htmlFor="input-foto">
          <IconButton
            sx={{
              position: "absolute",
              bottom: "8px",
              right: "20px",
              zIndex: "1",
              
            }}
            component="span"
          >
            <MdAddAPhoto />
          </IconButton>
        </label>
      </Avatar>

      <Box>
        <TextField
          label="Nome Completo"
          variant="outlined"
          type="text"
          size="small"
        ></TextField>

        <TextField label="E-mail" variant="outlined" type="text" size="small"></TextField>

        <TextField label="Telefone" variant="outlined" type="text" size="small"></TextField>

        <TextField label="CEP" 
        variant="outlined" 
        value={cep}
        onChange={handleCepChange}
        type="text"
        size="small">
        
        </TextField>

      </Box>
      <Box sx={{ marginBottom: "15px" }}>
        <TextField
          label="Logradouro"
          value={endereco.logradouro}
          variant="outlined"
          type="text"
          size="small"
        ></TextField>

        <TextField label="Bairro" 
        variant="outlined" 
        size="small"
        value={endereco.bairro}
        type="text"></TextField>

        <TextField label="Cidade" 
        variant="outlined" 
        size="small"
        value={endereco.cidade}
        type="text"></TextField>

        <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}  size="small">
          <InputLabel id="demo-simple-select-standard-label">UF</InputLabel>
          <Select
            value={estadoSelecionado}
            onChange={(e) => setEstadoSelecionado(e.target.value)}
          >
            <MenuItem value="">Selecione um estado</MenuItem>
            {estadosBrasileiros.map((estado) => (
              <MenuItem key={estado} value={estado}>
                {estado}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <Button variant="contained" sx={{ height: "48px", marginTop: "10px" }}>
          Salvar
        </Button>
      </Box>
    </Box>
  );
};
