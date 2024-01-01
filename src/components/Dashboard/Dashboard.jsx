import React, { useState } from "react";
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
} from "@mui/material";
import Chart from "react-google-charts";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CarteiraMao from '../../assets/carteira-mao.png'
import Image from "next/image";

const Dashboard = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  const options = {
    title: "My Daily Activities",
    colors: ["#97b7d7", "#cbdff2", "#3a96f2", "#2196f3", "#0060bd"], // Cores em tons de azul
    pieHole: 0.4,
    
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
          <DatePicker
            label="Data Inicial"
            format="D/M/YYYY"
            variant="standard"
            /* value={selectedStartDate} */
            onChange={handleStartDateChange}
            size="small"
            sx={{background:'rgb(255, 255, 255)', marginRight:'2px'}}
          />
          <DatePicker
            label="Data Final"
            format="D/M/YYYY"
            variant="standard"
            /* value={selectedEndDate} */
            onChange={handleEndDateChange}
            size="small"
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
              data={data}
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
              data={data}
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
              data={data}
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
              data={data}
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
