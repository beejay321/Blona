"use client";
import React, { useState } from "react";
import Login from "../components/Login";
import { useEffect } from "react";
import PDFUploader from "@/components/pdfUploader";

const Home: React.FC = () => {
  const [isLoggedIn, setisLoggedIn] = useState<string | null>("false");

  useEffect(() => {
    setisLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  if (isLoggedIn === "true") {
    return (
      <div>
        <h1 className="heading">Welcome to Blona</h1>
        <PDFUploader />
      </div>
    );
  }
  return <Login />;
};

export default Home;
