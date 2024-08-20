"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../../public/styles/home-style.css";
import Main from "../../components/Main";
import { useRouter } from "next/navigation";

export const Home = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const user = JSON.parse(storedUser);

    if (!user || !user.user_id) {
      router.push("/");
    } else {
      setCurrentUser(user.user_id);
      setCurrentUser(user.username);
    }
  }, [router]);

  useEffect(() => {}, [currentUser, currentUserName]);

  return (
    <body>
      <Navbar />
      <Main userID={currentUser} />
    </body>
  );
};
export default Home;
