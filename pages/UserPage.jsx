import { Container } from "@mui/material";
import React from "react";
import NavBar from "../src/components/NavBar/NavBar";
import { FormUser } from "../src/components/FormUser/FormUser";
import AuthGuard from "../src/Services/withAuth";


const UserPage = () => {
  return (
    <>
      <AuthGuard>
        <style jsx global>{`
          body {
            margin: 0;
            padding: 0;
            background-color: rgb(244, 247, 248);
            background: contain;
            min-height: 100vh;
          }
        `}</style>
        <Container>
          <NavBar />
          <FormUser />
        </Container>
      </AuthGuard>
    </>
  );
};

export default UserPage;
