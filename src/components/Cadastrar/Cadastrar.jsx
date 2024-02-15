import Image from "next/image";
import React, { useState } from "react";
import Link from "@mui/material/Link";
import { FaEyeSlash, FaEye } from "react-icons/fa";

import Logo from "../../assets/Finances.png";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputAdornment from '@mui/material/InputAdornment';
import { createTheme, ThemeProvider } from "@mui/material/styles";


import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Finances
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}




const schema = yup.object().shape({
  name: yup
    .string()
    .required("O nome é obrigatório")
    .min(5, "O nome deve ter 5 cacteres ou mais")
    .max(25, "O nome deve ter no máximo 20 caracteres"),
  email: yup
    .string()
    .required("O e-mail é obrigatório")
    .email("E-mail inválido")
    .test("format", "O e-mail deve ser no formato padrão", (value) => {
      return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
    }),
  password: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .required("Senha é obrigatória"),
  
});

const defaultTheme = createTheme();

const Cadastrar = () => {
  const {
    handleSubmit: handleSubmitForm,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = async (data) => {

    try {
      const isValid = await handleSubmitForm(() => {})();

      if (!isValid) {
        setErrorMessage("Preencha todos os campos corretamente!");
        return;
      } 
      
    
      const formData = {
        name: data.name,
        password: data.password,
        email: data.email,
       
      };
     
      const response = await fetch('https://apifinances.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      console.log("Request Data:", formData);
      console.log('Status da resposta:', response.status);

      if (!response.ok) {
        console.log(`Erro ao enviar dados: ${response.statusText}`);
      }

      await toast.promise(
        Promise.resolve(),
        {
          pending: "Realizando cadastro... 🕛 ", 
          success: "Cadastro realizado com sucesso! 😃 ", 
          position: "top-center",
          autoClose: 3000,
        }
      );

      
    } catch (error) {
      
      await toast.promise(
        Promise.reject(), 
        {
          pending: "Realizando cadastro... 🕛", 
          error: `Erro durante ao realizar cadastro: ${error.message} 😔`,
          position: "top-center",
          autoClose: 3000,
        }
      );
     
      console.error('Erro durante a requisição:', error);
      setErrorMessage("Erro ao enviar dados");
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh", minHeight: 400 }}>
        <ToastContainer />
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url('/fundo2.png')`,
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image src={Logo} alt="logo" width={250} height={250} />

            <Typography component="h1" variant="h5" sx={{ color: "#6aa5f1" }}>
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmitForm(onSubmit)}
              sx={{ mt: 1 }}
            >
            <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
             <TextField
             {...field}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
                />
                )}
              />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
              <TextField
              {...field}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
                />
                )}
              />
              <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
              <TextField
              {...field}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box
                        onClick={togglePasswordVisibility}
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
              )}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid
                container
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                
                <Grid item>
                  <Link href="/" variant="body" sx={{textDecoration: 'none' }}>
                    {"Have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Cadastrar
