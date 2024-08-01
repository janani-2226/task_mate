import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
  CARD: "card",
};

function Home() {
  const navigate = useNavigate();
  const [taskDetails, setTaskDetails] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://taskmate-backend-xh3p.onrender.com/home`);
        const tasks = response.data.map(task => ({
          ...task,
          status: task.status || "TODO"
        }));
        setTaskDetails(tasks);
        console.log("Fetched tasks:", tasks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setShowEditModal(true);
  };

  const handleViewClick = (task) => {
    setCurrentTask(task);
    setShowViewModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    setCurrentTask(null);
  };

  const handleViewClose = () => {
    setShowViewModal(false);
    setCurrentTask(null);
  };

  const handleSave = async () => {
    try {
      const updatedTask = { ...currentTask };
      delete updatedTask._id; // Remove _id field before sending the update request

      await axios.put(`https://taskmate-backend-xh3p.onrender.com/home/${currentTask._id}`, updatedTask);
      const updatedTasks = taskDetails.map((task) =>
        task._id === currentTask._id ? currentTask : task
      );
      setTaskDetails(updatedTasks);
      handleEditClose();
      alert("Task updated successfully!");
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://taskmate-backend-xh3p.onrender.com/${id}`);
      const updatedTasks = taskDetails.filter((task) => task._id !== id);
      setTaskDetails(updatedTasks);
      alert("Task deleted successfully!");
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const moveCard = (id, status) => {
    const updatedTasks = taskDetails.map((task) => {
      if (task._id === id) {
        return { ...task, status };
      }
      return task;
    });
    setTaskDetails(updatedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container-fluid">
        <div className="row">
          <nav className="navbar nav1">
            <div className="col-lg-6"></div>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={`Hi, ${localStorage.getItem("name")}!`}
              menuVariant="dark"
            >
              <Dropdown.Item className="" to="">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                <Link className="">My Profile</Link>
              </Dropdown.Item>
              <Dropdown.Item className="" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </Dropdown.Item>
            </NavDropdown>
          </nav>
        </div>
        <div className="container">
          <div className="row">
            <div>
              <Link to={"/create"} className="btn btn-primary addtask">
                Add Task
              </Link>
            </div>
          </div>
          <div className="row homenav2">
            <div className="">
              <div className="d-flex">
                <h6 className="s1">Search :</h6>
                <input className="s1" type="search" placeholder="Search..." />
              </div>
              <div className="d-flex ">
                <h6 className="s2 ">Sort By :</h6>
                <select name="type">
                  <option value="recent">Recent</option>
                </select>
              </div>
            </div>
          </div>
          <div className="content d-flex">
            <Column
              title="TODO"
              tasks={taskDetails.filter((task) => task.status === "TODO")}
              moveCard={moveCard}
              handleDelete={handleDelete}
              handleEditClick={handleEditClick}
              handleViewClick={handleViewClick}
            />
            <Column
              title="IN PROCESS"
              tasks={taskDetails.filter((task) => task.status === "IN PROCESS")}
              moveCard={moveCard}
              handleDelete={handleDelete}
              handleEditClick={handleEditClick}
              handleViewClick={handleViewClick}
            />
            <Column
              title="COMPLETED"
              tasks={taskDetails.filter((task) => task.status === "COMPLETED")}
              moveCard={moveCard}
              handleDelete={handleDelete}
              handleEditClick={handleEditClick}
              handleViewClick={handleViewClick}
            />
          </div>
        </div>
      </div>

      {/* Edit Task Modal */}
      <Modal show={showEditModal} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentTask && (
            <Form>
              <Form.Group controlId="formTaskTitle">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  type="text"
                  name="task"
                  value={currentTask.task}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formTaskDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={currentTask.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formTaskDate">
                <Form.Label>Created Date</Form.Label>
                <Form.Control
                  type="text"
                  name="date"
                  value={currentTask.date}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Task Modal */}
      <Modal show={showViewModal} onHide={handleViewClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentTask && (
            <div>
              <h6>Task Name: {currentTask.task}</h6>
              <p>Description: {currentTask.description}</p>
              <p>Created Date: {currentTask.date}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleViewClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </DndProvider>
  );
}

function Column({ title, tasks, moveCard, handleDelete, handleEditClick, handleViewClick }) {
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item) => {
      moveCard(item.id, title);
    },
  });

  return (
    <div className="col-lg-4 cls" ref={drop}>
      <div className="contenthd">
        <h5
          style={{
            padding: "5px",
          }}
        >
          {title}
        </h5>
      </div>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          handleDelete={handleDelete}
          handleEditClick={handleEditClick}
          handleViewClick={handleViewClick}
        />
      ))}
    </div>
  );
}

function TaskCard({ task, handleDelete, handleEditClick, handleViewClick }) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      className="card"
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1, marginBottom: "1rem" }}
    >
      <div className="card-body">
        <h5 className="card-title">{task.task}</h5>
        <p className="card-text">{task.description}</p>
        <button
          className="btn btn-primary" style={{
            marginRight:"5px"
          }}
          onClick={() => handleEditClick(task)}
        >
          Edit
        </button>
        <button
          className="btn btn-secondary" style={{
            marginRight:"5px"
          }}
          onClick={() => handleViewClick(task)}
        >
          View
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Home;