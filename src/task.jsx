import API_KEY, { API_URL } from "./constant.js";
import React, { useState, useEffect } from "react";
import GetOperations from "./operation";

const NewTasks = () => {
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
        console.log("task", task);
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
  const [data1, getData] = useState([]);
  const [operationForm, setOperationForm] = useState(false);
    const getData1 = () => {
      useEffect(() => {
        fetch(`${API_URL}/tasks`, {
          headers: {
            Authorization: API_KEY,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            getData(data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [])
      return data1;
    }

  const toggleOperationForm = () => {
    setOperationForm(prevState => !prevState);
    console.log(operationForm)
  };
  const removeData = (id) => {
      fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Authorization: API_KEY,
        },
      })
        .then((response) => {
          let del = data1.filter(el => id !== el.id)
          getData(del)
        })
        .catch((error) => {
          console.log(error);
        });
    return data1;
  }

  getData1();
  if (data1) {
    return (
      <div >
        <ul>
          {data1.map((el, index) => {
            return (
              <li
                key={index}
                style={{ display: "flex", flexDirection: "column", color: 'magenta'}}
              >
                <div className="taskTitle" style={{ display: "flex", flexDirection: "row"}}>
                  <span>{el.title}</span>

                  <div className="taskBtns" style={{marginLeft: '50px'}}>
                    <button onClick={toggleOperationForm}>Add</button>
                    <button type="submit" onClick={() => removeData(el.id)}>Finish</button>
                  </div>
                </div>

                <span>{el.description}</span>
                <span>{el.addedDate}</span>
                <span>{el.id}</span>
                <span>{el.status}</span>
                <GetOperations id={el.id} operationForm={operationForm}></GetOperations>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default GetTasks;
export { NewTasks };
