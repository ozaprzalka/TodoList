import API_KEY, { API_URL } from "./constant.js";
import React, { useState, useEffect } from "react";

const GetOperations = ({ id, operationForm }) => {
  const [operation, getOperation] = useState([]);
  const [toggle, setToggle] = useState(operationForm);
  const [addOperation, setOperation] = useState([]);
  console.log('operationForm: ', operationForm);
  useEffect(() => {
      setToggle(operationForm)
  }, [])
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
          description : addOperation,
          timeSpent: 0,
      }
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
          console.log(operation)
        })
        .catch((error) => {
          console.log("add new error", error);
        });
  }
//   if (form === true) {
//       return (
//         <input type="text"
//         className="form-control"
//         placeholder="Operation description"
//         // value={operationDescription}
//         onChange={e => setOperationDescription(e.target.value)}/>
//       )
//   }
  const renderAddNew = () => {
    if (operationForm === true) {
        return (
          <div>{console.log('form', operationForm)}
          <input type='text' placeholder='description' visibility='visible' name={addOperation} onChange={e => setOperation(e.target.value)}></input>
          <button onClick={createOperation}>Add operation</button>
        </div>
        )
    }
    else {
        return null;
    }
  }
  const renderOperationList = () => {
    if (operation) {
        return (
          <div>
            <ul>{console.log(operation)}
              {operation.map((el, index) => {
                return (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "20px",
                      color: "green",
                    }}
                  >
                    {console.log(operation)}
                    <span>{el.timeSpent}</span>
                    <span>{el.addedDate}</span>
                    <span>{el.id}</span>
                    <span>{el.description}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      }
      else {
          return (
              <div>No operations to render</div>
          )
      }
  }
  return (
      <>
      {renderAddNew()}
      {renderOperationList()}
      </>
  )
};

// const addOperation = ({ id }) => {
//     const [newOperation, addNewOperation] = ([])
//   useEffect(() => {
//     fetch(`${API_URL}/tasks/${id}/operations`, {
//       method: "POST",
//       headers: {
//         Authorization: API_KEY,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         addNewOperation(data.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);
// };

export default GetOperations;
