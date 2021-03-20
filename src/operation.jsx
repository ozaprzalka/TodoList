import API_KEY, { API_URL } from "./constant.js";
import React, { useState, useEffect } from "react";



const GetOperations = ({ id, operationForm }) => {
  const [operation, getOperation] = useState([]);
  const [toggle, setToggle] = useState(operationForm);
  const [addOperation, setOperation] = useState([]);
  const [timeTogle, setTimeToggle] = useState(false);
  const [time, saveTime] = useState(0);
  useEffect(() => {
    setToggle(operationForm);
  }, []);
  useEffect(() => {
    fetch(`${API_URL}/tasks/${id}/operations`, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        getOperation(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const createOperation = () => {
    const newData = {
      description: addOperation,
      timeSpent: 0,
    };
    fetch(`${API_URL}/tasks/${id}/operations`, {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOperation([...operation, data]);
      })
      .catch((error) => {
        console.log("add new error", error);
      });
  };
  const deleteOperation = (id) => {
    fetch(`${API_URL}/operations/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
      },
    })
      .then((response) => {
        let del = operation.filter((el) => id !== el.id);
        getOperation(del);
      })
      .catch((error) => {
        console.log(error);
      });
    return operation;
  };
  const handleEditTime = (e) => {
    e.preventDefault();
    saveTime(e.target.value);
  }
  const editOperation = (id, desc) => {
    const editData = {
      description: desc,
      timeSpent: time,
    };
    fetch(`${API_URL}/operations/${id}`, {
      method: "PUT",
      body: JSON.stringify(editData),
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOperation([...operation, data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const toggleAddTime = () => {
    setTimeToggle((prevState) => !prevState);
  };
  const renderAddNew = () => {
    if (operationForm === true) {
      return (
        <div>
          <input
            type="text"
            placeholder="description"
            visibility="visible"
            name={addOperation}
            onChange={(e) => setOperation(e.target.value)}
          ></input>
          <button onClick={createOperation}>Add operation</button>
        </div>
      );
    } else {
      return null;
    }
  };
  const renderOperationList = () => {
    if (operation) {
      return (
        <div>
          <ul>
            {operation.map((el, index) => {
              return (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "20px",
                    color: "green",
                    textAlign: "left",
                  }}
                >
                  <div style={{display: "flex", flexDirection: "column"}}>
                    {/* <span>{el.timeSpent}</span>
                    <span>{el.addedDate}</span>
                    <span>{el.id}</span> */}
                    <div>
                    <span classname='operationDescription'>{el.description}</span>
                      <button style={{marginLeft: '30px'}}
                        clasname="addTime"
                        onClick={() => toggleAddTime()}
                      >
                        Add time
                      </button>
                      <button
                        classname="removeOperation"
                        onClick={() => deleteOperation(el.id)}
                      >
                        finish
                      </button>
                    </div>
                    {timeTogle && (
                      <>
                      <input
                        type="number"
                        classname="addTimeInput"
                        placeholder="add time spent"
                        name={time}
                        onChange={handleEditTime}
                      ></input>
                      <button classname="addTimeBtn" onClick={() => editOperation(el.id, el.description)}>Add time</button>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No operations to render</div>;
    }
  };
  return (
    <>
      {renderAddNew()}
      {renderOperationList()}
    </>
  );
};

export default GetOperations;
