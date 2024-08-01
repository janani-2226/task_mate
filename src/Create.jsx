import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from "react-bootstrap/NavDropdown";

function Create() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      task: "",
      date: "",
      description: "",
    },
    onSubmit: async (values) => {
      try {
        await axios.post("https://taskmate-backend-xh3p.onrender.com/create", values);
        console.log(values);
        alert("Task Added");
        formik.resetForm();
      } catch (error) {
        console.log(error);
        alert("Regitration Failed");
      }
    },
  });

  let handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="conatiner-fluid">
          <div className="row">
            <nav class="navbar nav1">
              <div className="col-lg-6"></div>
              <div className="col-lg-6 navlogbt">
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={`Hi, ${localStorage.getItem("name")}!`}
                  menuVariant="dark"
                >
                  <Dropdown.Item className="" to="">
                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    <Link className="">My Profile</Link>
                  </Dropdown.Item>
                  <Dropdown.Item className="" onClick={handlelogout}>
                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                  </Dropdown.Item>
                </NavDropdown>
              </div>
            </nav>
          </div>
        </div>
        <div className="container">
          <div className="col-lg-12 createnav2">
            <div className="d-flex createnav3">
              <h6 className="s1">Search :</h6>
              <input type="search" placeholder="Search..." />
            </div>
            <div className="d-flex">
              <h6 className="s2">Sort By :</h6>
              <select name="type">
                <option value="reacent">Reacent</option>
              </select>
            </div>
          </div>

          <div className="col-lg-12 createnav4">
            <div className="contenthd">
              <h5
                style={{
                  padding: "5px",
                }}
              >
                TODO
              </h5>
            </div>
            <div
              className="task"
              style={{
                background: "rgb(206, 222, 241)",
              }}
            >
              <h5 class="card-header">Task</h5>
              <div class="taskin row">
                <div className="col-lg-6">
                  <input
                    className="form-control createin"
                    placeholder="Enter Your Task"
                    name="task"
                    value={formik.values.task}
                    onChange={formik.handleChange}
                  ></input>
                </div>

                <input
                  type="date"
                  className="createin form-control col-lg-6"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                />
                <div className="col-lg-6">
                  <input
                    className="form-control createin"
                    placeholder="Description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  ></input>
                </div>
                
              </div>

              <div
                style={{
                  paddingLeft: "85%",
                  marginTop: "30px",
                }}
              >
                <button type="submit" class="btn btn-danger bts">
                  Add task
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Create;
