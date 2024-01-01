import React, { useState } from "react";
import Image from 'next/image'
import {
  AppBar,
  List,
  ListItem,
  Avatar,
  IconButton,
} from "@mui/material";
import { RxExit } from "react-icons/rx";
import {BsGraphUpArrow } from "react-icons/bs";
import {  BiSolidUserCircle } from "react-icons/bi";
import { GiPiggyBank } from "react-icons/gi";
import { useRouter } from "next/router";

const NavBar = () => {
 
  const router = useRouter();

  const handleLogout = () => {
    
    router.push("/");
  };
  
  const handleUser = () => {
    
    router.push("/UserPage");
  };

  const handleDashboard = () => {
    
    router.push("/DashboardPage");
  };
  
  const handleFinance = () => {
    router.push("/HomePage")
  }

 

  

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "4vw",
        maxWidth: "100vw",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "0 7px 7px 0 ",
        marginRight: "10px",
        padding: 0,
        left: 0
      }}
    >
    
    
      <List >
        <ListItem>
          <IconButton onClick={() => handleUser()}>
            <BiSolidUserCircle color="white" size={20}  />
          </IconButton>
        </ListItem>
       <ListItem>
          <IconButton onClick={() => handleDashboard()}>
            <BsGraphUpArrow color="white" size={20}  />
          </IconButton>
        </ListItem>
        <ListItem>
          <IconButton onClick={() => handleFinance()}>
            <GiPiggyBank  color="white" size={20}/>
          </IconButton>
        </ListItem>
        <ListItem sx={{ marginTop: "5rem" }}>
          <IconButton  onClick={() => handleLogout()}>
             <RxExit color="white " size={20} />
            </IconButton>
        </ListItem>
      </List>
      
       
    </AppBar>
  );
};

export default NavBar;
