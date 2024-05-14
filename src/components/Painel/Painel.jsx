import React, {useEffect, useState} from 'react'
import Image from 'next/image';
import Cards from '../Cards/Cards'
import {  Grid } from '@mui/material'
import { MdAttachMoney } from "react-icons/md";
import { BsArrowUpCircle, BsArrowDownCircle } from "react-icons/bs";
import Porco from '../../assets/porquinho.png'
import authService from "../../Services/useAuth";

const Painel = () => {
  const userId = authService.getUserIdFromCookies();
  const token = authService.getTokenFromCookies();
  const [totalEntradas, setTotalEntradas] = useState(0);
  const [totalSaidas, setTotalSaidas] = useState(0);
  const [saldoRestante, setSaldoRestante] = useState(0)
 
  
  
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await fetch('https://apifinances.onrender.com/moviments', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            userId: userId,
          },
        });
        const data = await response.json();
        console.log(data)

        const { totalEntradas, totalSaidas, saldoRestante } = calcularSomas(data);

        setTotalEntradas(totalEntradas);
        setTotalSaidas(totalSaidas);
        setSaldoRestante(saldoRestante);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    // Chamar a função para buscar dados da API e calcular as somas
    fetchDataFromAPI();
  }, []);

  const calcularSomas = (dados) => {
    let totalEntradas = 0;
    let totalSaidas = 0;

    dados.movimento.forEach((item) => {
      const valor = parseFloat(item.valor);
      if (item.tipo === 'entrada') {
        totalEntradas += valor;
      } else if (item.tipo === 'saida') {
        totalSaidas += valor;
      }
    });

    // Calcular saldo restante
    const saldoRestante = totalEntradas - totalSaidas;

    return {
      totalEntradas,
      totalSaidas,
      saldoRestante,
    };
  };

  return (
    <div style={{display:'flex',justifyContent:'center', alignCenter:'center'}}>
     <Grid container spacing={1} justifyContent='center' sx={{display: 'flex',marginTop:'30px', width:'70%'}}>
      <Grid item >
        <Cards 
        tittle="Entrada"
         Icon={BsArrowDownCircle} 
         value={totalEntradas}
        />
      </Grid>
      <Grid item >
        <Cards 
        tittle="Saída" 
        Icon={BsArrowUpCircle} 
        value={totalSaidas}
        />
      </Grid>
      <Grid item >
        <Cards 
        tittle="Total"
         Icon={ MdAttachMoney} 
         value={saldoRestante}
          />
      </Grid>
      <Grid item >
       <Image src={Porco} alt="porquinho com moedas" width={150} ></Image>
       
       
    
      </Grid>
     </Grid>
    </div>
  )
}

export default Painel