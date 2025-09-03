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
                    <Col md={{ span: 5, offset: 4 }}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="add item . . . "
                                size="lg"
                                value={this.state.userInput}
                                onChange={(item) =>
                                    this.updateInput(item.target.value)
                                }
                                aria-label="add something"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup>
                                <Button
                                    variant="dark"
                                    className="mt-2"
                                    onClick={() => this.addItem()}
                                >
                                    ADD
                                </Button>
                            </InputGroup>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 5, offset: 4 }}>
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
                                            padding: "15px 20px",
                                            marginBottom: "10px",
                                            backgroundColor: "#f8f9fa",
                                            border: "1px solid #dee2e6",
                                            borderRadius: "8px",
                                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                                        }}
                                    >
                                        <span className="todo-text" style={{
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            color: "#333",
                                            flex: "1",
                                            textAlign: "left",
                                            marginRight: "15px",
                                            wordBreak: "break-word"
                                        }}>
                                            {item.value}
                                        </span>
                                        <div className="button-group" style={{
                                            display: "flex",
                                            gap: "8px",
                                            flexShrink: "0"
                                        }}>
                                            <Button 
                                                size="sm"
                                                variant="outline-primary"
                                                onClick={() => this.editItem(index)}
                                                style={{
                                                    minWidth: "60px",
                                                    fontSize: "14px",
                                                    fontWeight: "500"
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Button 
                                                size="sm"
                                                variant="outline-danger"
                                                onClick={() => this.deleteItem(item.id)}
                                                style={{
                                                    minWidth: "70px",
                                                    fontSize: "14px",
                                                    fontWeight: "500"
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
