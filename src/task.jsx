import API_KEY, { API_URL } from "./constant.js";
import React, { useState, useEffect } from "react";
import GetOperations from "./operation";

const NewTasks = ({ onNewTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };
  const createTask = () => {
    const newTask = {
      title: title,
      description: description,
      status: "open",
    };
    fetch(`${API_URL}/tasks`, {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((task) => {
        onNewTask();
      })
      .catch((error) => {
        console.log("add new error", error);
      });
  };
  const handleButton = (e) => {
    e.preventDefault();
    createTask();
    setTitle("");
    setDescription("");
  };

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <h1>New task</h1>
      <input type="text" value={title} onChange={handleTitle}></input>
      <input
        type="text"
        value={description}
        onChange={handleDescription}
      ></input>
      <button type="submit" onClick={handleButton}>
        Add task
      </button>
    </form>
  );
};

const GetTasks = () => {
  const [data1, setData] = useState([]);
  const [update, setUpdate] = useState("open");
  const [operationForm, setOperationForm] = useState(false);
  const getData1 = () => {
    fetch(`${API_URL}/tasks`, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return data1;
  };
  useEffect(() => {
    getData1();
  }, []);
  const editTask = (id, stat, title, description) => {
    const newTaskData = {
      title: title,
      description: description,
      status: stat == "open" && "closed",
    };
    fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(newTaskData),
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((task) => {
        onNewTask();
      })
      .catch((error) => {
        console.log("add new error", error);
      });
  };
  const toggleOperationForm = () => {
    setOperationForm((prevState) => !prevState);
  };
  const removeData = (id) => {
    fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
      },
    })
      .then((response) => {
        let del = data1.filter((el) => id !== el.id);
        setData(del);
      })
      .catch((error) => {
        console.log(error);
      });
    return data1;
  };

  if (data1) {
    return (
      <div>
        <NewTasks onNewTask={getData1}></NewTasks>
        {data1.map((el, index) => {
          if (el.status === "closed") {
            return (
              <>
                <ul>
                  <li
                    className={el.id}
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      color: "purple",
                      textDecoration: 'line-through',
                      textAlign: "left",
                      marginLeft: '50px'
                    }}
                  >
                    <div
                      className="taskTitle"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <span>{el.title}</span>

                      <div className="taskBtns" style={{ marginLeft: "50px" }}>
                        <button type="submit" onClick={() => removeData(el.id)}>
                          End
                        </button>
                      </div>
                    </div>
                    <span>{el.description}</span>
                  </li>
                </ul>
              </>
            );
          }
          if (el.status === 'open') {
            return (
              <ul>
                <li
                  className={el.id}
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    color: "magenta",
                    textAlign: "left"
                  }}
                >
                  <div
                    className="taskTitle"
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <span>{el.title}</span>

                    <div className="taskBtns" style={{ marginLeft: "50px" }}>
                      <button onClick={toggleOperationForm}>Add</button>
                      <button
                        type="submit"
                        onClick={() =>
                          editTask(el.id, el.status, el.title, el.description)
                        }
                      >
                        Finish
                      </button>
                      <button type="submit" onClick={() => removeData(el.id)}>
                        End
                      </button>
                    </div>
                  </div>

                  <span>{el.description}</span>
                  {/* <span>{el.addedDate}</span>
                  <span>{el.id}</span>
                  <span>{el.status}</span> */}
                  <GetOperations
                    id={el.id}
                    operationForm={operationForm}
                  ></GetOperations>
                </li>
              </ul>
            );
          }
        })}
      </div>
    );
  }
};

export default GetTasks;
export { NewTasks };
