import React from "react";
import NavBar from "../src/components/NavBar/NavBar";
import Main from "../src/components/Main/Main";
import { FormProvider } from '../src/js/FormContext';
import { authMiddleware } from '../src/js/useAuth';

const HomePage = () => {
  return (
  <FormProvider>
    <div >
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
      <NavBar />
      <Main />
    </div>
  </FormProvider>
  );
};

export const getServerSideProps = authMiddleware(async () => {
  return {
    props: {},
  };
});
export default HomePage;
