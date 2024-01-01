import React from 'react'
import Image from 'next/image';
import Cards from '../Cards/Cards'
import { Card, Grid } from '@mui/material'
import { MdAttachMoney } from "react-icons/md";
import { BsArrowUpCircle, BsArrowDownCircle } from "react-icons/bs";
import Porco from '../../assets/porquinho.png'


const Painel = () => {
  return (
    <div style={{display:'flex',justifyContent:'center', alignCenter:'center'}}>
     <Grid container spacing={1} justifyContent='center' sx={{display: 'flex',marginTop:'40px', width:'70%'}}>
      <Grid item sx={8}>
        <Cards 
        tittle="Entrada"
         Icon={BsArrowDownCircle} 
         value="1000"
        />
      </Grid>
      <Grid item sx={8}>
        <Cards 
        tittle="Saída" 
        Icon={BsArrowUpCircle} 
        value="1000"
        />
      </Grid>
      <Grid item sx={10}>
        <Cards 
        tittle="Total"
         Icon={ MdAttachMoney} 
         value="1000"
          />
      </Grid>
      <Grid item sx={12}>
       <Image src={Porco} alt="porquinho com moedas" width={150} ></Image>
       
       
    
      </Grid>
     </Grid>
    </div>
  )
}

export default Painel