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
  const [imagemPerfil, setImagemPerfil] = useState(null);
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const estadosBrasileiros = [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins",
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

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        marginTop: "30px",
      }}
    >
      <Avatar
        alt="Usuário"
        src={imagemPerfil}
        sx={{
          width: "10rem",
          height: "10rem",
          position: "relative",
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
              right: "17px",
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
          variant="standard"
          type="text"
        ></TextField>

        <TextField label="E-mail" variant="standard" type="text"></TextField>

        <TextField label="Telefone" variant="standard" type="text"></TextField>

        <TextField label="CEP" variant="standard" type="text"></TextField>
      </Box>
      <Box sx={{ marginBottom: "15px" }}>
        <TextField
          label="Logradouro"
          variant="standard"
          type="text"
        ></TextField>

        <TextField label="Bairro" variant="standard" type="text"></TextField>

        <TextField label="Cidade" variant="standard" type="text"></TextField>


      <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
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
