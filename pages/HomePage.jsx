import React, { useEffect } from "react";
import Head from "next/head";
import NavBar from "../src/components/NavBar/NavBar";
import Main from "../src/components/Main/Main";
import { FormProvider } from "../src/Services/FormContext";
import AuthGuard from "../src/Services/withAuth";


const HomePage = ({ user, token }) => {
  console.log("Renderizando a HomePage para o usuário:", user, token);
  return (
    <AuthGuard>
      <FormProvider>
        <div>
          <style jsx global>{`
            body {
              margin: 0;
              padding: 0;
              background-color: rgb(244, 247, 248);
              background-size: cover;
              background-repeat: no-repeat;
              min-height: 100vh;
            }
          `}</style>
          <Head>
            <title>Finances</title>
            <meta name="description" content="Sua descrição aqui" />
            {/*  <link rel='icon' href='../src/assets/Finances.png' /> */}
          </Head>
          <NavBar />
          <Main />
          {/*  <ToastContainer />  */}
        </div>
      </FormProvider>
    </AuthGuard>
  );
};

export default HomePage;
