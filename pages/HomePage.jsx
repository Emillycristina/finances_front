import React from "react";
import NavBar from "../src/components/NavBar/NavBar";
import Main from "../src/components/Main/Main";

const HomePage = () => {
  return (
    <div >
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background-image: linear-gradient(to top, white 20%, #2e74f5);
          background-size: contain; /* Alterado de 'cover' para 'contain' */
          min-height: 100vh;
        
        }
      `}</style>
      <NavBar />
      <Main />
    </div>
  );
};

export default HomePage;
