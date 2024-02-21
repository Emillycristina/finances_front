import React from "react";
import NavBar from "../src/components/NavBar/NavBar";
import Dashboard from "../src/components/Dashboard/Dashboard";
import Header from "../src/components/Header/Header";
import { FormProvider } from "../src/Services/FormContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardPage = () => {
  return (
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
        <Header />
        <NavBar />
        <Dashboard />
      </div>
      <ToastContainer />
    </FormProvider>
  );
};

export default DashboardPage;
