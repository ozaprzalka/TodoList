import API_KEY, { API_URL } from "./constant.js";
import React, { useState, useEffect } from "react";
import GetOperations from './operation';

const NewTasks = () => {
  const [title, setTitle] = useState('a kurwa');
  const [description, setDescription] = useState('pierdole');
  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value)
  }
  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value)
  }
  const createTask = () => {
    const newTask = {
      title: title,
      description: description,
      status: 'open',
    }
    useEffect(() => {
      fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
          body: JSON.stringify(newTask)
        },
      })
      .then(response => response.json())
      .then(task => {
        console.log(newTask)
        console.log('task', task);
      })
      .catch(error => {
        console.log('add new error', error);
      });
    }, [title, description])
  }
  const handleButton = (e) =>
    e.preventDefault();
    createTask();
  return (
    <form style={{display: 'flex', flexDirection: 'column'}}>
      <h1>New task</h1>
      <input type="text" value={title} onChange={handleTitle}></input>
      <input type="text" value={description} onChange={handleDescription}></input>
      <button type="click" onClick={handleButton}>Add task</button>
    </form>
  )
}

const GetTasks = () => {
  const [data, getData] = useState([]);
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
  }, []);

  if (data) {
    return (
      <div>
        <ul>
          {data.map((el, index) => {
            return (
              <li
                key={index}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {console.log(data)}
                <span>{el.title}</span>
                <span>{el.description}</span>
                <span>{el.addedDate}</span>
                <span>{el.id}</span>
                <span>{el.status}</span>
                <GetOperations id={el.id}></GetOperations>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default GetTasks;
export {NewTasks};
