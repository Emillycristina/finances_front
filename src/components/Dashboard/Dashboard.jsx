import React, { useState, useEffect } from "react";
import {
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Container,
  Card,
  Grid,
  Box,
  TextField
} from "@mui/material";
import Chart from "react-google-charts";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CarteiraMao from '../../assets/carteira-mao.png'
import authService from "../../Services/useAuth";
import "dayjs/locale/pt-br";
import dayjs from 'dayjs'
import Image from "next/image";


const Dashboard = () => {
  const userId = authService.getUserIdFromCookies();
  const token = authService.getTokenFromCookies();

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [totalEntradas, setTotalEntradas] = useState(0);
  const [totalSaidas, setTotalSaidas] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      if (!(selectedStartDate instanceof Date) || !(selectedEndDate instanceof Date)) {
        console.error("selectedStartDate e selectedEndDate devem ser objetos Date válidos");
        return;
      }
      
      const formattedStartDate = dayjs(selectedStartDate).format('YYYY-MM-DD');
      const formattedEndDate = dayjs(selectedEndDate).format('YYYY-MM-DD');
  
      try {
        const response = await fetch(
          `https://apifinances.onrender.com/moviments?start=${formattedStartDate}&end=${formattedEndDate}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              userId: userId,
            },
          }
        );
        const data = await response.json();
        // Filtrando apenas as datas e os valores
        const filteredData = data.movimento.map((item) => [item.data, item.valor, item.descricao, item.tipo]);
        const chartDataWithHeaders = [["Data", "Valor", "Descrição", "Tipo"], ...filteredData];
        
        let totalEntradas = 0;
        let totalSaidas = 0;
        filteredData.forEach((item) => {
          if (item[3] === "entrada") {
            totalEntradas += item[1];
          } else if (item[3] === "saida") {
            totalSaidas += item[1];
          }
        })

      
        
        setTotalEntradas(totalEntradas);
        setTotalSaidas(totalSaidas);
        
        setChartData(chartDataWithHeaders);
        
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };
  
    fetchData();
  }, [selectedStartDate, selectedEndDate]);
  

  const handleStartDateChange = (date) => {
    setSelectedStartDate(new Date(date));
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(new Date(date));

  };

  const chartDataForGraph = [
    ["Tipo", "Valor"],
    ["Entradas", totalEntradas],
    ["Saídas", totalSaidas],
  ];

  const options = {
    title: "MOVIMENTAÇÕES POR TIPO",
    colors: ["#97b7d7", "#cbdff2", "#3a96f2", "#2196f3", "#0060bd"], // Cores em tons de azul
    pieHole: 0.4,
    width: 400,
    height: 240,
    
  };

  return (
    <Container>
     <Box sx={{display:'flex', alignItems:'center', justifyContent:'end', marginTop:'7px'}}>
      <Typography variant="body1" gutterBottom  color='#2196f3'>
        Selecione o período desejado.
      </Typography>
     </Box>
      <FormControl sx={{display:'flex', flexDirection:'row', marginTop:'10px', justifyContent:'end' }} >
         <LocalizationProvider dateAdapter={AdapterDayjs}>
         <TextField
            label="Data Inicial"
            type="date"
            defaultValue={dayjs(selectedStartDate).format('YYYY-MM-DD')}
            onChange={handleStartDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{background:'rgb(255, 255, 255)', marginRight:'2px'}}
          />
          <TextField
            label="Data Final"
            type="date"
            defaultValue={dayjs(selectedEndDate).format('YYYY-MM-DD')}
            onChange={handleEndDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{background:'#FFF'}}
          /> 
        </LocalizationProvider> 
      </FormControl>

      <Grid container spacing={2} marginTop={5} justifyContent='center'>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{background:'rgb(255, 255, 255, 0.4)'}}>
            <Chart
              chartType="PieChart"
              width="100%"
              height="100%"
              data={chartDataForGraph}
              options={options}
            />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <Chart
              chartType="BarChart"
              width="100%"
              height="100%"
              data={chartDataForGraph}
              options={options}
            />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="100%"
              data={chartDataForGraph}
              options={options}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Card>
            <Chart
              chartType="AreaChart"
              width="100%"
              height="100%"
              data={chartDataForGraph}
              options={options}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{display:'flex', justifyContent:'end'}} >
    
            <Image src={CarteiraMao} alt='cofre' width={300}/>
          
        </Grid>

      </Grid>
    </Container>
  );
};

export default Dashboard;
