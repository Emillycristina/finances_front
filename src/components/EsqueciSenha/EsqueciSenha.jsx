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
import { InputAdornment } from "@mui/material";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';



const validationSchema = yup.object().shape({
  password1: yup
    .string()
    .required("Senha é obrigatória")
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,12}$/,
      "A senha deve conter pelo menos uma letra minúscula e maiúscula , um caracter especial e um número"
    ),
  password2: yup
    .string()
    .required("Senha é obrigatória")
    .oneOf([yup.ref("password1"), null], "As senhas não coincidem"),
});

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

const onSubmit = async (data) => {

  // Verifique se todos os campos estão vazios
  if (!data.password2 && !data.password1  && data.password1 !== data.password2) {
    // Exibir uma mensagem de erro ou feedback ao usuário
    setError("form", {
      type: "manual",
      message: "Preencha os campos corretamente!",
    });
  } else {
    // Executar ação de envio do formulário aqui
    const formData = {
     password2: data.password2,
      
    };
  }
}



const defaultTheme = createTheme();

const EsqueciSenha = () => {
  const {
    handleSubmit: handleSubmitForm,
    control,
    formState:{ errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  

  
  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };
  
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh", minHeight: 400 }}>
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

            <Typography  sx={{ color: "#6aa5f1" }}>
              Confirm new password:
            </Typography>
            
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmitForm(onSubmit)}
            >
              <Controller
                name="password1"
                control={control}
                defaultValue=""
                render={({ field }) => (
              <TextField
              {...field}
                margin="normal"
                required
                fullWidth
                name="password1"
                label="Password"
                type={passwordVisible2 ? "text" : "password"}
                value={password1}
                autoComplete="current-password"
                error={!!errors.password1}
                helperText={errors.password1? errors.password1.message : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box
                        onClick={togglePasswordVisibility2}
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        {passwordVisible2 ? <FaEye /> : <FaEyeSlash />}
                      </Box>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  field.onChange(e); 
                  setPassword1(e.target.value); 
                }}
               />
             )}
            />
            <Controller
                name="password2"
                control={control}
                defaultValue=""
                render={({ field }) => (
             <TextField
               {...field}
                margin="normal"
                required
                fullWidth
                name="password2"
                label=" Confirm Password"
                value={password2}
                type={passwordVisible ? "text" : "password"}
                autoComplete="current-password"
                error={!!errors.password2}
                helperText={errors.password2? errors.password2.message : ""}
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
                   onChange={(e) => {
                    field.onChange(e); 
                    setPassword2(e.target.value); 
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
                Send Password
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

export default EsqueciSenha;
