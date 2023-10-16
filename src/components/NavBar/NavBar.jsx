import React, { useState } from "react";
import {
  AppBar,
  List,
  ListItem,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { RxExit } from "react-icons/rx";
import { BsArrowsAngleExpand, BsGraphUpArrow } from "react-icons/bs";
import { BiSolidReport, BiSolidUserCircle } from "react-icons/bi";
import { useRouter } from "next/router";

const handleLogout = () => {

  router.push("/login");
};





const NavBar = () => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    
    router.push("/");
  };
  
  const handleUser = () => {
    
    router.push("/UserPage");
  };
  

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  

  return (
    <AppBar
      position="fixed"
      sx={{
        width: expanded ? "20vh" : "9vh",
        maxWidth: "100vw",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: 0,
        padding: 0,
      }}
    >
      <IconButton onClick={toggleNavbar} sx={{ marginBottom: "5rem" }}>
        <BsArrowsAngleExpand color="white" />
      </IconButton>
      <List>
        <ListItem>
          <IconButton>
            <BiSolidUserCircle color="white" size={27} />
          </IconButton>
        </ListItem>
        <ListItem>
          <IconButton>
            <BiSolidReport color="white" size={27} />
          </IconButton>
        </ListItem>
        <ListItem>
          <IconButton>
            <BsGraphUpArrow color="white" />
          </IconButton>
        </ListItem>
        <ListItem sx={{ marginTop: "5rem" }}>
          <IconButton  onClick={() => handleLogout()}>
             <RxExit color="white" />
            </IconButton>
        </ListItem>
      </List>
      {expanded && (
        <AppBar
          position="absolute"
          sx={{
            width: "20vh",
            height: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            
          }}
        >
          <IconButton onClick={toggleNavbar}>
            <BsArrowsAngleExpand color="white" />
          </IconButton>
          <Avatar
            onClick={() => handleUser()}
            alt="Usuário"
            sx={{
              width: " 5rem",
              height: " 5rem",
              marginTop: "4rem",
              marginBottom: "5rem",
              cursor:'pointer',
            }}
          ></Avatar>

          <List sx={{ paddingLeft: 2, marginBottom:5}}>
            <ListItem sx={{ paddingLeft: 0 }}>
              <BiSolidReport color="white" size={27} />
              <Typography sx={{ marginLeft: "5px", fontSize: "13px", cursor:'pointer'  }}>
                Relatórios
              </Typography>
            </ListItem>
            <ListItem sx={{ paddingLeft: 0 }}>
              <BsGraphUpArrow color="white" size={22} />
              <Typography sx={{ marginLeft: "5px", fontSize: "13px", cursor:'pointer'  }}>
                Metas
              </Typography>
            </ListItem>
          </List>
        <Typography sx={{ marginTop: 5, cursor:'pointer' }} onClick={() => handleLogout()}>
          
            <RxExit sx={{ cursor: "pointer" }} /> Sair
        
          </Typography>
        </AppBar>
      )}
    </AppBar>
  );
};

export default NavBar;
