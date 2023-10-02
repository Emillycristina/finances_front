import React from 'react'
import Header from '../Header/Header'
import Cards from '../Cards/Cards'
import { Grid } from '@mui/material'
import Form from '../Form/Form'
import {MdAttachMoney, } from 'react-icons/md'
import {BsArrowUpCircle, BsArrowDownCircle} from 'react-icons/bs'

const Main = () => {
  return (
    <div sx={{display:'flex', alignItems:'center', justifyContent:'center', placeItens:'center'}}>
      <Header  />
      <Grid container spacing={1} justifyContent="center" marginTop='-48px'>
        <Grid item>
          <Cards title='Entradas' Icon={BsArrowUpCircle} value='1000'/> 
        </Grid>
        <Grid item>
          <Cards title='Saídas' Icon={BsArrowDownCircle} value='1000' />
        </Grid>
        <Grid item>
          <Cards title='Total' Icon={MdAttachMoney} value='1000' /> 
        </Grid>
      </Grid>
      <Form />
    </div>
  )
}

export default Main