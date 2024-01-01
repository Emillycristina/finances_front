import React from 'react'
import { Card, CardContent, Box, Typography } from '@mui/material';

const Cards = ({title,Icon, value}) => {
  return (
    <div>
        <Card 
        sx={{
         background: "rgba( 255, 255, 255, 0.7)",
         height:'90px',
         width: '200px',
         marginTop:'10px',
         padding:'10px',
         border: 'none',
         }}> 
            <CardContent>
            <Box display="flex" alignItems="center">
              {Icon && <Icon size={25} color='#2e74f5' />}
              <Typography variant="h6" sx={{ ml: 2}}>
                {title}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              
              <Typography variant="h4" sx={{ ml: 1, mt: 2 }}>
                {value}
              </Typography>
            </Box>
            </CardContent>
        </Card>
    </div>
  )
}

export default Cards