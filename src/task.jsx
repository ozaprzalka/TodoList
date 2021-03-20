import API_KEY, { API_URL } from "./constant.js";
import React, { useState, useEffect } from "react";
import GetOperations from "./operation";
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  Container,
  Box,
  Text,
} from "@chakra-ui/react";

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
    <Container maxW="m" centerContent>
      <form style={{ display: "flex", flexDirection: "column", width: '50%' }}>
        <FormControl>
          <Text fontSize='4xl'>New task</Text>
          <FormLabel isRequired='true' htmlFor="taskTitle"></FormLabel>
          <Input
            type="text"
            value={title}
            name="taskTitle"
            placeholder='title'
            onChange={handleTitle}
          ></Input>
          <FormLabel htmlFor="taskDescription"></FormLabel>
          <Input
            type="text"
            name="taskDescription"
            placeholder='description'
            value={description}
            onChange={handleDescription}
          ></Input>
        </FormControl>
        <Button type="submit" mt={4} colorScheme="pink" onClick={handleButton}>
          Add task
        </Button>
      </form>
    </Container>
  );
};

const GetTasks = () => {
  const [data1, setData] = useState([]);
  // const [update, setUpdate] = useState("open");
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
                <Container maxW="xl" centerContent>
                  <Box padding="10" margin="50px 0" width="3xl" borderWidth={2}>
                    <ul>

                      <li
                        className={el.id}
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          color: "purple",
                          textAlign: "left",
                          marginLeft: "50px",
                        }}
                        >
                        

                        <div
                          className="taskTitle"
                          style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', borderBottom:'1px solid white' }}
                          >
                          <Text fontSize='3xl' as='del'>{el.title}</Text>

                          <div
                            className="taskBtns"
                            style={{ marginLeft: "50px" }}
                            >
                            <Button
                              type="submit"
                              colorScheme='pink'
                              onClick={() => removeData(el.id)}
                              >
                              remove
                            </Button>
                          </div>
                        </div>
                          
                        <Text fontSize='2xl' as='del'>{el.description}</Text>
                      </li>
                    </ul>
                  </Box>
                </Container>
              </>
            );
          }
          if (el.status === "open") {
            return (
              <>
                <Container maxW="xxl" centerContent>
                  <Box padding="10" margin="10" width="3xl" borderWidth={2}>
                    <ul>
                      <li
                        className={el.id}
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          color: "magenta",
                          textAlign: "left",
                        }}
                      >
                        <div
                          
                          className="taskTitle"
                          style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', borderBottom:'2px solid white'}}
                        >
                          <Text bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text" fontSize='3xl'>{el.title}</Text>

                          <div
                            className="taskBtns"
                            style={{ marginLeft: "50px" }}
                          >
                            <Button colorScheme='messenger' marginLeft='10' onClick={toggleOperationForm}>Add</Button>
                            <Button
                              marginLeft='5'
                              colorScheme='whatsapp'
                              type="submit"
                              onClick={() =>
                                editTask(
                                  el.id,
                                  el.status,
                                  el.title,
                                  el.description
                                )
                              }
                            >
                              Finish
                            </Button>
                            <Button
                              marginLeft='5'
                              colorScheme='pink'
                              type="submit"
                              onClick={() => removeData(el.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>

                        <Text bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text" fontSize='2xl'>{el.description}</Text>
                        {/* <Text>{el.addedDate}</Text>
                  <Text>{el.id}</Text>
                  <Text>{el.status}</Text> */}
                        <GetOperations
                          id={el.id}
                          operationForm={operationForm}
                        ></GetOperations>
                      </li>
                    </ul>
                  </Box>
                </Container>
              </>
            );
          }
        })}
      </div>
    );
  }
};

export default GetTasks;
export { NewTasks };
