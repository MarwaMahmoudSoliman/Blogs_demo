import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Api from "../config/api";
import { notifyError, notifySuccess } from "../component/Notify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserhData } from "../rtk/slices/userSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Api.post("/api/auth/login", inputs)
      .then(() => {
        notifySuccess("Login Successfully");
        navigate("/");
        dispatch(fetchUserhData());
      })
      .catch((error) => {
        console.log(error);
        const errMsg =
          error?.response?.data?.message || error?.response?.data?.error;

        notifyError(errMsg);
      });
  };

  return (
    <>
      <section className="py-5">
        <Container>
          <div className="card p-3 mb-1 mt-2  mx-auto w-50">
            <h3 className="pb-2">Sign In</h3>
            <form action="" onSubmit={handleSubmit}>
              <h6>E-mail</h6>
              <input
                type="email"
                className="mb-2 w-100 p-1"
                name="email"
                value={inputs.email}
                onChange={handleChange}
              />
              <h6>Password</h6>
              <input
                type="password"
                className="mb-2 w-100 p-1"
                name="password"
                value={inputs.password}
                onChange={handleChange}
              />
              <button type="submit" className="btn btn-warning w-100 mb-2">
                Sign In
              </button>
              <Link className="btn btn-warning w-100" to="/register">
                Create Account
              </Link>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Login;
