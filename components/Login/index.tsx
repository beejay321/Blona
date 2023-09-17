"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    fields: "",
    password: "",
    error: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (form.username.length === 0 || form.password.length === 0) {
      setError({ ...error, fields: "Fields cannot be empty" });
    } else if (form.username === "Blona" && form.password === "ToTheSky") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/";
    } else {
      setError({
        ...error,
        fields: "",
        error:
          "Invalid credentials. Please check that fields are filled correctly",
      });
    }
  };

  return (
    <>
      <div className="container">
        <form className=" flex flex-col ">
          <h1 className="form-title">Login</h1>
          <div className=" flex flex-col ">
            <label htmlFor="">Username</label>
            <input
              className=" login-input"
              type="text"
              placeholder="John Doe"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Password</label>
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {error.fields && <p className="text-red-600">{error.fields}</p>}

            {error && <p className="text-red-600">{error.error}</p>}
          </div>
          <button className="login-button" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
