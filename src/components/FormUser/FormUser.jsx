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
import authService from "../../Services/useAuth";



export const FormUser = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const userId = authService.getUserIdFromCookies();
  const token = authService.getTokenFromCookies();
 
  const [cep, setCep ] = useState("");
  const [userData, setUserData] = useState({});
  const [endereco, setEndereco] = useState({});

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
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://apifinances.onrender.com/address",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              userId: userId,
            },
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          
           if (data.addresses && data.addresses.length > 0) {
            const userDataFromAPI = data.addresses[0];
            setUserData(userDataFromAPI);
            setEndereco({
              logradouro: userDataFromAPI.logradouro || "",
              bairro: userDataFromAPI.bairro || "",
              cidade: userDataFromAPI.cidade || "",
              uf: userDataFromAPI.uf || "",
            });
            if (userDataFromAPI.uf) {
              setEstadoSelecionado(userDataFromAPI.uf.toUpperCase());
            }
            if (userDataFromAPI.imagemPerfil) {
              setImagemPerfilUrl(userDataFromAPI.imagemPerfil);
            }
            if (userDataFromAPI.cep) {
              setCep(userDataFromAPI.cep);
            }
            
          } else {
           
            setUserData({}); 
            setEndereco({}); 
            setEstadoSelecionado(""); 
            setImagemPerfil(null);
          }
        } else {
          console.error("Erro ao buscar dados da API:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };
  
    fetchData();
  }, []);
  
  console.log(userData)


  const handleCepChange = (e) => {
    const cepNovo = e.target.value;

    if (cepNovo.length === 8 && !userData.cep) {
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
    

    if (!data || !data.nome || !data.telefone || !cep || !endereco.logradouro || !endereco.bairro || !endereco.cidade || !estadoSelecionado) {
     
      toast.error('Preencha todos os campos obrigatórios', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    console.log(cep, endereco.logradouro, endereco.bairro, endereco.cidade, estadoSelecionado)
   
    
  
  
   
 try{

  const formData = new FormData();

    formData.append('nomeCompleto', data.nome);
    formData.append('telefone', data.telefone);
    formData.append('email', data.email);
    formData.append('cep', cep);
    formData.append('logradouro', endereco.logradouro);
    formData.append('bairro', endereco.bairro);
    formData.append('cidade', endereco.cidade);
    formData.append('uf', estadoSelecionado);
    formData.append('userId', userId);
    formData.append('file', imagemPerfil);

    

    const response = await fetch('https://apifinances.onrender.com/address',
    {
      method: 'POST',
      headers: {
      
      'Authorization' : `Bearer ${token}`
      },
      body: formData,
    })
    console.log(formData)
   
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
         value={userData.nomeCompleto  || ""}
          {...register("nome", { required: true })}
        ></TextField>

        <TextField 
        label="E-mail" 
        variant="outlined" 
        type="text" 
        size="small"
        value={userData.email || ""}
        {...register("email", { required: true })}></TextField>

        <TextField 
        label="Telefone" 
        variant="outlined" 
        type="text" 
        size="small"
        value={userData.telefone || ""}
        {...register("telefone", { required: true })}></TextField>

        <TextField label="CEP" 
        variant="outlined" 
        value={cep}
        onChange={handleCepChange}
        type="text"
        size="small"
        
        >
        
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
        value={endereco.bairro || ""}
        type="text"></TextField>

        <TextField label="Cidade" 
        variant="outlined" 
        size="small"
        value={endereco.cidade || ""}
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
