import { useState } from "react";
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as authActions from "../../store/auth/actions";
import projectsApi from "../../api/projectsApi";

function ProjectForm({ setUnauthorized, setRefreshProjectsList }) {
  const dispatch = useDispatch();

  const [validatedFormProject, setValidatedFormProject] = useState(false);
  const [loadingFormProject, setLoadingFormProject] = useState(false);
  const [errorFormProject, setErrorFormProject] = useState(false);
  const [projectName, setProjectName] = useState("");

  async function handleSubmitAddProject(event) {
    setValidatedFormProject(false);
    setRefreshProjectsList(false);

    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (form.checkValidity()) {
      try {
        setLoadingFormProject(true);
        const res = await projectsApi.createProject({ name: projectName, });
        setProjectName("");
        setRefreshProjectsList(true);
      } catch (error) {
        if (error.response) {
          if (error?.response?.status === 403 || error?.response?.status === 401) {
            dispatch(authActions.setUser(null));
            dispatch(authActions.setToken(null));
            setUnauthorized(true);
          }
          setErrorFormProject(error?.response?.data?.message);
        } else {
          setErrorFormProject(error?.message);
        }
      } finally {
        setLoadingFormProject(false);
      }
    } else {
      setValidatedFormProject(true);
    }
  }

  return (
    <Card>
      <Card.Title className="border-bottom py-2">Create a new Project</Card.Title>
      <Card.Body>
        <div className="text-start">
          <Form onSubmit={handleSubmitAddProject} noValidate validated={validatedFormProject}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter name of the project"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)} />
            </Form.Group>
            {errorFormProject && <p className="text-danger">{errorFormProject}</p>}
            <Button variant="primary" type="submit" disabled={loadingFormProject}>
              {loadingFormProject && <Spinner size="sm" animation="border" />}
              {!loadingFormProject && "Create Project"}
            </Button>
          </Form>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectForm;