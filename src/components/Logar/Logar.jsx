
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
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
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authService from "../../Services/useAuth";


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

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("O e-mail é obrigatório")
    .email("E-mail inválido"),
  password: yup.string().required("Senha é obrigatória"),
});

const defaultTheme = createTheme();

const Login = () => {
  const router = useRouter();
  const {
    handleSubmit: handleSubmitForm,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSend = async (data) => {
    
    if (!data.password && !data.email) {
      
      alert("Preencha os dados para realizar o login");
    } else {
     
      const formData = {
        password: data.password,
        email: data.email,
      };
      
      try {
        const response = await fetch("https://apifinances.onrender.com/sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        });
      
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Erro ao autenticar: ${errorMessage}`);
        }
      
        const responseData = await response.json();
        const { token, id } = responseData;
      
        await authService.setToken(token);
        await authService.setUserId(id);
       

        console.log(token, id)
      
        if (authService.isAuthenticated()) {
         
          router.replace("/HomePage");
          
          // Exibir mensagem de boas-vindas
          toast.success("Seja Bem-Vindo(a)! 😃", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          console.log("Usuário não autenticado.");
        }
      } catch (error) {
        toast.error(`Erro durante a autenticação: ${error.message} 😔`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  }      
  
  useEffect(() => {
    if (authService.isAuthenticated()) {
      console.log("Usuário autenticado. Iniciando redirecionamento...");
      router.replace("/HomePage");
      console.log("Redirecionamento concluído!");
    } else {
      console.log("Usuário não autenticado.");
    }
  }, []);


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
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmitForm(onSend)}
              sx={{ mt: 1 }}
            >
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
                    autoComplete="current-password"
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
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
                      setPassword(e.target.value);
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
                Sign In
              </Button>
              <Grid
                container
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Grid item xs>
                  <Link
                    href="/ConfirmEmail"
                    variant="body"
                    sx={{ textDecoration: "none" }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="/SignUp"
                    variant="body"
                    sx={{ textDecoration: "none" }}
                  >
                    {"Don't have an account? Sign Up"}
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

export default Login;
