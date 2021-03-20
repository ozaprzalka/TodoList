import API_KEY, { API_URL } from "./constant.js";
import React, { useState, useEffect } from "react";
import {
  FormControl,
  Input,
  Button,
  Container,
  Text,
} from "@chakra-ui/react";

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
  };
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
        <Container maxW="m" centerContent>
          <FormControl>
            <Input
              type="text"
              placeholder="next operation"
              visibility="visible"
              name={addOperation}
              onChange={(e) => setOperation(e.target.value)}
            ></Input>
          </FormControl>
          <Button mt={4} colorScheme="pink" onClick={createOperation}>
            Add operation
          </Button>
        </Container>
      );
    } else {
      return null;
    }
  };
  const renderOperationList = () => {
    if (operation) {
      return (
        <div>
          <Container maxW="xxl" centerContent>
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        borderTop: "1px solid white",
                      }}
                    >
                      <div>
                        <Text
                          bgGradient="linear(to-r, #7928CA, #FF0080)"
                          bgClip="text"
                          fontSize="2xl"
                          classname="operationDescription"
                        >
                          {el.description}
                        </Text>
                        <Button
                          colorScheme="messenger"
                          marginLeft="10"
                          clasname="addTime"
                          onClick={() => toggleAddTime()}
                        >
                          Add time
                        </Button>
                        <Button
                          marginLeft="10"
                          colorScheme="pink"
                          classname="removeOperation"
                          onClick={() => deleteOperation(el.id)}
                        >
                          Remove
                        </Button>
                      </div>
                      {timeTogle && (
                        <>
                          <Container width="xs" centerContent margin={4}>
                            <FormControl>
                              <Input
                                marginTop="5"
                                type="number"
                                classname="addTimeInput"
                                placeholder="add time spent"
                                name={time}
                                onChange={handleEditTime}
                              ></Input>

                              {/* <Input
                              marginTop='5'
                              type="number"
                              classname="addTimeInput"
                              placeholder="add time spent"
                              name={time}
                              onChange={handleEditTime}
                              ></Input> */}
                            </FormControl>
                            <Button
                              marginTop="3"
                              colorScheme="whatsapp"
                              classname="addTimeBtn"
                              onClick={() =>
                                editOperation(el.id, el.description)
                              }
                            >
                              Add time
                            </Button>
                          </Container>
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Container>
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
