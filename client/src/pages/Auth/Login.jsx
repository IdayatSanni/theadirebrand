import React from "react";
import LayoutTheme from "../../components/Layout/LayoutTheme";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <LayoutTheme title={"Login"}>
      <div className='form-container '>
        <form onSubmit={handleSubmit}>
          <h4 className='title'>LOGIN FORM</h4>

          <div className='mb-3'>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='form-control'
              id='exampleInputEmail1'
              placeholder='Enter Your Email '
              required
            />
          </div>
          <div className='mb-3'>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='form-control'
              id='exampleInputPassword1'
              placeholder='Enter Your Password'
              required
            />
          </div>

          <button type='submit' className='btn btn-primary'>
            LOGIN
          </button>
        </form>
      </div>
    </LayoutTheme>
  );
};

export default Login;
