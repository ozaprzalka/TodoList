import API_KEY, { API_URL } from "./constant.js";
import React, { useState, useEffect } from "react";

const GetOperations = ({id}) => {
    const [operation, getOperation] = useState([]);
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
  
    if (operation) {
      return (
        <div>
          <ul>
            {operation.map((el, index) => {
              return (
                <li
                  key={index}
                  style={{ display: "flex", flexDirection: "column", margin: '20px', color: 'magenta'}}
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
  };

export default GetOperations;