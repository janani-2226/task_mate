import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.password !== values.confirmPassword) {
        errors.password = "Password and Repeat Password are not same";
      }
      if (values.email === "") {
        errors.email = "Required";
      }

      if (values.lastname === "") {
        errors.lastname = "Required";
      }

      if (values.firstname === "") {
        errors.firstname = "Required";
      }
      if (values.password === "") {
        errors.password = "Required";
      }
      return errors;
    },
    onSubmit: async (values, formikBag) => {
      try {
        await axios.post("https://taskmate-backend-xh3p.onrender.com/register", values);
        console.log(values);
        alert("Registered Successfully");
        formikBag.resetForm();
        navigate("/");
      } catch (error) {
        console.log(error);
        alert("Regitration Failed");
      }
    },
  });

  return (
    <>
      <div className="conatainer-fluid">
        <div className="row">
          <nav class="navbar nav1">
            <div className="col-lg-6"></div>
            <div className="col-lg-6 logbt">
              <button className="btn btn-outline-primary bt">Login</button>
              <button className="btn btn-outline-primary bt">Signup</button>
            </div>
          </nav>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <h5 className="signuphead">Signup</h5>
          </div>
          <div className="col-lg-4 signcontent">
            <input
              type="text"
              placeholder="First Name"
              className="form-control in"
              name="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange}
            />
            <span className="m" style={{ color: "red", fontSize: 12 }}>
              {formik.errors.firstname}
            </span>
            <input
              type="text"
              placeholder="Last Name"
              className="form-control in mt-3"
              name="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
            />
            <span className="ml-3" style={{ color: "red", fontSize: 12 }}>
              {formik.errors.lastname}
            </span>
            <input
              type="text"
              placeholder="Email"
              className="form-control in mt-3"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <span className="ml-3" style={{ color: "red", fontSize: 12 }}>
              {formik.errors.email}
            </span>
            <input
              type="text"
              placeholder="Password"
              className="form-control in mt-3"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <span className="ml-3" style={{ color: "red", fontSize: 12 }}>
              {formik.errors.password}
            </span>
            <input
              type="text"
              placeholder="Confirm Pasword"
              className="form-control mt-3"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
            <span className="ml-3" style={{ color: "red", fontSize: 12 }}>
              {formik.errors.password}
            </span>
            <button
              type="submit"
              class="btn btn-primary"
              style={{
                width: "100% ",
                marginTop: "20px",
              }}
            >
              Register
            </button>
            <div
              className="signup"
              style={{
                paddingLeft: "25%",
                paddingTop: "20px",
              }}
            >
              <h6>Already have an Account?</h6>
              <Link to={"/"} className="px-2">
                Login
              </Link>
            </div>
            {/* <div className="signupbt">
              <button className="btn btn-primary">Login with Google</button>
            </div> */}
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
