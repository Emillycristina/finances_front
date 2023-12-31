import { Container } from '@mui/material'
import React from 'react'
import NavBar from '../src/components/NavBar/NavBar'
import { FormUser } from '../src/components/FormUser/FormUser'

const UserPage = () => {
  return (
    <>
    <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background-color: rgb(244, 247, 248);
          background: contain; /* Alterado de 'cover' para 'contain' */
          min-height: 100vh;
        
        }
      `}</style>
    <Container>
      <NavBar />
      <FormUser />
    
    </Container>
    </>
  )
}

export default UserPage