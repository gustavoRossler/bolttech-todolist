import { useState } from "react";
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as authActions from "../../store/auth/actions";
import tasksApi from "../../api/tasksApi";

function TaskForm({ project, setRefreshTasksList }) {
  const dispatch = useDispatch();

  const [validatedFormTask, setValidatedFormTask] = useState(false);
  const [loadingFormTask, setLoadingFormTask] = useState(false);
  const [errorFormTask, setErrorFormTask] = useState(false);
  const [description, setDescription] = useState("");

  async function handleSubmitAddTask(event) {
    setValidatedFormTask(false);
    setRefreshTasksList(false);

    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (form.checkValidity()) {
      try {
        setLoadingFormTask(true);
        const res = await tasksApi.createTask({ description, projectId: project?.id });
        setDescription("");
        setRefreshTasksList(true);
      } catch (error) {
        if (error.response) {
          if (error?.response?.status === 403 || error?.response?.status === 401) {
            dispatch(authActions.setUser(null));
            dispatch(authActions.setToken(null));
          }
          setErrorFormTask(error?.response?.data?.message);
        } else {
          setErrorFormTask(error?.message);
        }
      } finally {
        setLoadingFormTask(false);
      }
    } else {
      setValidatedFormTask(true);
    }
  }

  return (
    <Form onSubmit={handleSubmitAddTask} noValidate validated={validatedFormTask}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="text"
          placeholder="Enter description of the task"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)} />
      </Form.Group>
      {errorFormTask && <p className="text-danger">{errorFormTask}</p>}
      <Button variant="primary" type="submit" disabled={loadingFormTask}>
        {loadingFormTask && <Spinner size="sm" animation="border" />}
        {!loadingFormTask && "Add"}
      </Button>
    </Form>
  );
}

export default TaskForm;