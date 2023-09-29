import React from 'react';
import { AppBar, List, ListItem, ListItemText, Avatar, Typography  } from '@mui/material';
import {RxExit} from 'react-icons/rx'

const NavBar = () => {

    

    

    return (
       
          
        <AppBar 
         position="absolute"
          sx={{
            width: '20vh',
            height: '100%', 
            justifyContent: 'flex-start', // Alinhe os itens no início
            alignItems: 'center', // Alinhe os itens no início
            margin: 0,
            padding: 3,
           
          }}

        
        >
            <Avatar alt='Usuário' sx={{width:'5rem', height:'5rem', marginTop:'1rem', marginBottom:'2rem'}}></Avatar>
            <List >
              <ListItem >
                <ListItemText primary="" />
              </ListItem>
              <ListItem >
                <ListItemText primary="Relatórios" />
              </ListItem>
              <ListItem >
                <ListItemText primary="Metas" />
              </ListItem>
            </List>


            <Typography sx={{marginTop:30}}>
                <RxExit /> Sair
            </Typography>


            </AppBar>
    )
}


export default NavBar