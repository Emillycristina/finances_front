import React from "react";
import Header from "../Header/Header";
import Cards from "../Cards/Cards";
import { Container, Grid, Box, Item, Stack } from "@mui/material";
import Form from "../Form/Form";
import GridData from "../DataGrid/GridData";
import Painel from "../Painel/Painel";


const Main = () => {
  return (
    <div>
        <Header />
        <Painel />
       <Form /> 
      <GridData />
    
    </div>
  );
};

export default Main;
