"use client";
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import "../../public/styles/home-style.css";
import Main from "../../components/Main";



export const Home = () => {
  return (
    <body>
      <Navbar />
      <Main />
    </body>
  );
};
export default Home;
