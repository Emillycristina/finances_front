"use client"
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
import React, { useState, useEffect } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";



export const FormUser = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
 
  const [cep, setCep] = useState("");
  const isClient = typeof window === 'object';
  const [endereco, setEndereco] = useState(() => {
    if (isClient) {
      const enderecoSalvo = sessionStorage.getItem('endereco');
      return enderecoSalvo ? JSON.parse(enderecoSalvo) : {
        logradouro: "",
        bairro: "",
        cidade: "",
        uf: "",
      };
    } else {
      return {
        logradouro: "",
        bairro: "",
        cidade: "",
        uf: "",
      };
    }
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
      setImagemPerfil(arquivo);
    }
  };

  useEffect(() => {
    if (isClient){
    sessionStorage.setItem("cep", cep);
    sessionStorage.setItem('endereco', JSON.stringify(endereco));
    sessionStorage.setItem("imagemPerfil", imagemPerfil);
    sessionStorage.setItem("estadoSelecionado", estadoSelecionado);
  }
   }, [cep, imagemPerfil, estadoSelecionado, endereco, isClient])


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


  const onSend = async (data) => {
    console.log(data);

    if (!data || !data.nome || !data.telefone || !cep || !endereco.logradouro || !endereco.bairro || !endereco.cidade || !estadoSelecionado) {
     
      toast.error('Preencha todos os campos obrigatórios', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }
     const formData = new FormData();

     if (imagemPerfil) {
    formData.append('imagemPerfil', imagemPerfil,'imagemPefil.jpg')
  }


  formData.append('nome', data.nome);
  formData.append('telefone', data.telefone);
  formData.append('cep', cep);
  formData.append('logradouro', endereco.logradouro);
  formData.append('bairro', endereco.bairro);
  formData.append('cidade', endereco.cidade);
  formData.append('uf', estadoSelecionado);

 try{

    const response = await fetch('https://apifinances.onrender.com/adddress/',
    {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
    
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erro ao enviar dados: ${errorMessage}`);
    }

    await toast.promise(
      Promise.resolve(),
      {
        pending: 'Enviando dados... 🕛 ',
        success: 'Dados enviados com sucesso! 😃 ',
        position: 'top-center',
        autoClose: 3000,
      }
    );

    
  } catch (error) {
    await toast.promise(
      Promise.reject(),
      {
        pending: 'Enviando dados... 🕛',
        error: `Erro durante o envio de dados: ${error.message} 😔`,
        position: 'top-center',
        autoClose: 3000,
      }
    );
  }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSend)}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        marginTop: "30px",
        marginLeft:"50px",
        
       
      }}
    >
     <ToastContainer />
      <Avatar
        alt="Usuário"
        src={imagemPerfil ? URL.createObjectURL(imagemPerfil) : ''}
        sx={{
          width: "10rem",
          height: "10rem",
          position: "relative",
          zIndex: 0,
          bottom: "5px"
        }}
      >
        </Avatar>
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
              top: "10px",
              zIndex: "1",
              
            }}
            component="span"
          >
            <MdAddAPhoto />
          </IconButton>
        </label>
      

      <Box>
        <TextField
          label="Nome Completo"
          variant="outlined"
          type="text"
          size="small"
          {...register("nome", { required: true })}
        ></TextField>

        <TextField 
        label="E-mail" 
        variant="outlined" 
        type="text" 
        size="small"
        {...register("email", { required: true })}></TextField>

        <TextField 
        label="Telefone" 
        variant="outlined" 
        type="text" 
        size="small"
        {...register("telefone", { required: true })}></TextField>

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
        <Button type="submit" variant="contained"  sx={{ height: "48px", marginTop: "10px" }}>
          Salvar
        </Button>
      </Box>
    </Box>
  );
};
