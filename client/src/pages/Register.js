import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../component/Notify";
import Api from "../config/api";
import { useSelector } from "react-redux";

function Register() {
  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.user?.isLogin);

  // const [loading , setLoading] = useState(false)
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",

    email: "",
    password: "",

    repassword: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    // setLoading(true)
    e.preventDefault();

    try {
      if (inputs.password !== inputs.repassword) {
        // setLoading(false)
        return notifyError("password Dosen't match !!");
      }
      delete inputs.repassword;
      Api.post("api/auth/register", inputs)
        .then(() => {
          notifySuccess("Account Created");
          navigate("/login");
          // setLoading(true)
        })
        .catch((error) => {
          const errorMessage =
            error?.response?.data?.message || error?.response?.data?.error;
          console.log(errorMessage);
          notifyError(errorMessage);
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <section className="py-5">
        <Container>
          <div className="card p-3 mb-1 mt-2  mx-auto w-50">
            <h3 className="pb-2">Sign Up</h3>
            <Form onSubmit={handleSubmit}>
              <h6>FirstName</h6>
              <input
                type="text"
                name="firstName"
                value={inputs.firstName}
                placeholder="First Name"
                className="mb-2 w-100 p-1"
                onChange={handleChange}
              />

              <h6>LastName</h6>
              <input
                type="text"
                name="lastName"
                value={inputs.lastName}
                placeholder="Last Name"
                className="mb-2 w-100 p-1"
                onChange={handleChange}
              />
              <h6>E-mail</h6>
              <input
                type="email"
                name="email"
                value={inputs.email}
                placeholder="Email"
                className="mb-2 w-100 p-1"
                onChange={handleChange}
              />
              <h6>Password</h6>
              <input
                type="password"
                name="password"
                value={inputs.password}
                placeholder="Password"
                className="mb-2 w-100 p-1"
                onChange={handleChange}
              />
              <h6>re-Password</h6>
              <input
                type="password"
                name="repassword"
                value={inputs.repassword}
                placeholder="re-password"
                className="mb-2 w-100 p-1"
                onChange={handleChange}
              />
              <p>
                By creating an account, you agree to Blogs's Conditions of Use
                and Privacy Notice.
              </p>
              <button type="submit" className="btn btn-warning w-100 mb-2 ">
                Sign In
              </button>
              <span> have an account</span>
              <Link to="/login">Go to Login Page</Link>
            </Form>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Register;
