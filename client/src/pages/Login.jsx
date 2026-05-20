import { useState, useContext } from "react";

import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";

import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      login(res.data);

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-3xl w-full max-w-md border border-zinc-800"
      >
        <h1 className="text-4xl font-bold mb-6">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-zinc-800 mb-4 outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-zinc-800 mb-6 outline-none"
        />

        <button className="w-full bg-green-500 text-black py-3 rounded-xl font-bold hover:opacity-90">
          Login
        </button>

        <p className="text-zinc-400 mt-5 text-center">
          No account?{" "}
          <Link to="/register" className="text-green-400">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
