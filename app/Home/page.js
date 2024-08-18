import React from "react";
import Navbar from "../../components/Navbar";
import "../../public/styles/home-style.css";
import Main from "../../components/Main";
import Sidebar from "../../components/Sidebar";
export const Home = () => {
  return (
    <body>
      <Navbar />
      <Main />
      <Sidebar />
    </body>
  );
};
export default Home;
