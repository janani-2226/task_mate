import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const LoginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};

      if (values.email === "") {
        errors.email = "Required";
      }

      if (values.password === "") {
        errors.password = "Required";
      }
      return errors;
    },
    onSubmit: async (values, formikBag) => {
      try {
        await axios.post("https://taskmate-backend-xh3p.onrender.com/login", values);
        console.log(values);
        alert("Login Success");
        navigate("/home");
      } catch (error) {
        console.log(error);
        alert("Login Failed");
      }

      formikBag.resetForm();
    },
  });

  return (
    <>
      <div className="container-fluid">
        <div className="row nav1">
          <div className="col-lg-6">{/* Left side content (if any) */}</div>
          <div className="col-lg-6 d-flex justify-content-end">
            <button className="btn btn-outline-primary bt">Login</button>
            <button className="btn btn-outline-primary bt ml-2">Signup</button>
          </div>
        </div>
        <div className="col-lg-6 mt-5">
          <h3 className="loghead">Login</h3>

          <form className="login" onSubmit={LoginForm.handleSubmit}>
            <div class="mb-3">
              <input
                type="email"
                class="form-control"
                placeholder="Email"
                name="email"
                value={LoginForm.values.email}
                onChange={LoginForm.handleChange}
              />
              <span className="ml-3" style={{ color: "red", fontSize: 14 }}>
                {LoginForm.errors.email}
              </span>
            </div>
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Password"
                name="password"
                value={LoginForm.values.password}
                onChange={LoginForm.handleChange}
              />
              <span className="ml-3" style={{ color: "red", fontSize: 14 }}>
                {LoginForm.errors.password}
              </span>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              style={{
                width: "100% ",
              }}
            >
              Login
            </button>
            <div
              className="signup"
              style={{
                paddingLeft: "25%",
                paddingTop: "30px",
              }}
            >
              <h6>Dont't have an account?</h6>
              <Link to={"/signup"} className="px-2">
                Signup
              </Link>
            </div>
            {/* <div className="signupbt">
              <button className="btn btn-primary">Login with Google</button>
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
