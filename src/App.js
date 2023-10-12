import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Badge,
  Stack,
} from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodoTitle: "",
      newTodoDescription: "",
      completed: false,
    };
  }

  handleTitleChange = (event) => {
    this.setState({ newTodoTitle: event.target.value });
  };

  handleDescriptionChange = (event) => {
    this.setState({ newTodoDescription: event.target.value });
  };

  handleAddTodo = () => {
    const { newTodoTitle, newTodoDescription, todos } = this.state;
    if (newTodoTitle) {
      const newTodo = {
        title: newTodoTitle,
        description: newTodoDescription,
        completed: false,
      };
      this.setState({
        todos: [...todos, newTodo],
        newTodoTitle: "",
        newTodoDescription: "",
        showEditForm:false,
      });
    }
  };

  handleDeleteTodo = (index) => {
    const { todos } = this.state;
    todos.splice(index, 1);
    this.setState({ todos });
  };

  handleUpdateTodo = (index) => {
    const { todos } = this.state;
    const updateTodo = todos[index];

    const updateTitle = prompt("title:", updateTodo.title);
    const updateDescription = prompt("description:", updateTodo.description);

    if (updateDescription !== null && updateTitle !== null) {
      updateTodo.title = updateTitle;
      updateTodo.description = updateDescription;
      this.setState({ todos });
    }
  };

  handleCompleteTodo = (index) => {
    const { todos, completed } = this.state;
    todos[index].completed = true;
    this.setState({ todos });
  };

  render() {
    const { todos, newTodoTitle, newTodoDescription } = this.state;

    return (
      <Container className="cont">
        <Container className="cont1">
          <Row>
            <Col>
              <h2>Todo App</h2>
              <Form>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={newTodoTitle}
                    onChange={this.handleTitleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    value={newTodoDescription}
                    onChange={this.handleDescriptionChange}
                  />
                </Form.Group>
                <br />
                <Button variant="primary" onClick={this.handleAddTodo}>
                  Add Todo
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
        <Container className="cont2">
          <Row>
            <Col>
              <h3>Todo List</h3>
              <ListGroup>
                {todos.map((todo, index) => (
                  <ListGroup.Item key={index}>
                    <Stack direction="horizontal" gap={3}>
                      <Stack gap={3}>
                        <div className="p-2">
                          <div className="p-2">{todo.title}</div>
                          <div className="p-2">{todo.description}</div>
                        </div>
                      </Stack>
                      <div className="p-2 ms-auto">
                        <Stack direction="horizontal" gap={3}>
                          {todo.completed && (
                            <h6>
                              <Badge bg="success">&#10004;</Badge>
                            </h6>
                          )}
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => this.handleDeleteTodo(index)}
                          >
                            Delete
                          </Button>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => this.handleUpdateTodo(index)}
                          >
                            Update
                          </Button>
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => this.handleCompleteTodo(index)}
                          >
                            Complete
                          </Button>
                        </Stack>
                      </div>
                    </Stack>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default App;
