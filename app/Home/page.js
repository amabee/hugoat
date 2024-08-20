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
  const [currentUserImage, setCurrentUserImage] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const user = JSON.parse(storedUser);

    if (!user || !user.user_id || !user.username) {
      router.push("/");
    } else {
      console.log(user.username);
      setCurrentUser(user.user_id);
      setCurrentUserName(user.username);
      setCurrentUserImage(user.image);
    }
  }, [router]);

  useEffect(() => {}, [currentUser, currentUserName, currentUserImage]);

  return (
    <body>
      <Navbar />
      <Main
        userID={currentUser}
        username={currentUserName}
        image={currentUserImage}
      />
    </body>
  );
};
export default Home;
