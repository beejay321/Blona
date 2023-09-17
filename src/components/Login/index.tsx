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
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (form.username === "Blona" && form.password === "ToTheSky") {
      localStorage.setItem("isLoggedIn", "true");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        <form className="py-4 flex flex-col ">
          <div className="py-4 flex flex-col ">
            <label htmlFor="">Username</label>
            <input
              className="border h-10"
              type="text"
              placeholder="John Doe"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Password</label>
            <input
              className="border h-10 login-input"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {error && <p className="text-red-600">{error}</p>}
          </div>
          <button
            className="my-3 py-2 border w-20 bg-slate-300"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
