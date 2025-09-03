// App.js File
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);

        // Setting up state
        this.state = {
            userInput: "",
            list: [],
        };
    }

    // Set a user input value
    updateInput(value) {
        this.setState({
            userInput: value,
        });
    }

    // Add item if user input in not empty
    addItem() {
        if (this.state.userInput !== "") {
            const userInput = {
                // Add a random id which is used to delete
                id: Math.random(),

                // Add a user value to list
                value: this.state.userInput,
            };

            // Update list
            const list = [...this.state.list];
            list.push(userInput);

            // reset state
            this.setState({
                list,
                userInput: "",
            });
        }
    }

    // Function to delete item from list use id to delete
    deleteItem(key) {
        const list = [...this.state.list];

        // Filter values and leave value which we need to delete
        const updateList = list.filter((item) => item.id !== key);

        // Update list in state
        this.setState({
            list: updateList,
        });
    }

    editItem = (index) => {
      const todos = [...this.state.list];
      const currentValue = todos[index].value;
      const editedTodo = prompt('Edit the todo:', currentValue);
      if (editedTodo !== null && editedTodo.trim() !== '') {
        let updatedTodos = [...todos]
        updatedTodos[index].value = editedTodo.trim()
        this.setState({
          list: updatedTodos,
        });
      }
    }

    render() {
        return (
            <Container>
                <Row
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "3rem",
                        fontWeight: "bolder",
                    }}
                >
                    TODO LIST
                </Row>

                <hr />
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <InputGroup className="mb-3" style={{
                            display: "flex",
                            alignItems: "stretch"
                        }}>
                            <FormControl
                                placeholder="add item . . . "
                                size="lg"
                                value={this.state.userInput}
                                onChange={(item) =>
                                    this.updateInput(item.target.value)
                                }
                                aria-label="add something"
                                aria-describedby="basic-addon2"
                                style={{
                                    borderRadius: "8px 0 0 8px",
                                    border: "2px solid #dee2e6",
                                    fontSize: "16px",
                                    padding: "12px 16px"
                                }}
                            />
                            <Button
                                variant="primary"
                                onClick={() => this.addItem()}
                                style={{
                                    borderRadius: "0 8px 8px 0",
                                    border: "2px solid #007bff",
                                    borderLeft: "none",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    padding: "12px 24px",
                                    minWidth: "80px"
                                }}
                            >
                                ADD
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <ListGroup>
                            {/* map over and print items */}
                            {this.state.list.map((item, index) => {
                                return (
                                  <div key = {index} > 
                                    <ListGroup.Item
                                        className="todo-item"
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "20px 30px",
                                            marginBottom: "15px",
                                            backgroundColor: "#ffffff",
                                            border: "2px solid #e9ecef",
                                            borderRadius: "12px",
                                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                            minHeight: "70px"
                                        }}
                                    >
                                        <span className="todo-text" style={{
                                            fontSize: "18px",
                                            fontWeight: "500",
                                            color: "#2c3e50",
                                            flex: "1",
                                            textAlign: "left",
                                            marginRight: "20px",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            lineHeight: "1.5"
                                        }}>
                                            {item.value}
                                        </span>
                                        <div className="button-group" style={{
                                            display: "flex",
                                            gap: "8px",
                                            flexShrink: "0"
                                        }}>
                                            <Button 
                                                variant="success"
                                                onClick={() => this.editItem(index)}
                                                style={{
                                                    minWidth: "80px",
                                                    fontSize: "16px",
                                                    fontWeight: "600",
                                                    backgroundColor: "#28a745",
                                                    borderColor: "#28a745",
                                                    color: "white",
                                                    padding: "10px 16px",
                                                    borderRadius: "8px"
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Button 
                                                variant="danger"
                                                onClick={() => this.deleteItem(item.id)}
                                                style={{
                                                    minWidth: "90px",
                                                    fontSize: "16px",
                                                    fontWeight: "600",
                                                    backgroundColor: "#dc3545",
                                                    borderColor: "#dc3545",
                                                    color: "white",
                                                    padding: "10px 16px",
                                                    borderRadius: "8px"
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                  </div>
                                );
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
