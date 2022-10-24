import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Row, Col } from 'react-bootstrap';
import * as authActions from "../../store/auth/actions";
import projectsApi from "../../api/projectsApi";
import ProjectForm from "../../components/ProjectForm/ProjectForm";
import Header from "../../components/Header/Header";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.auth?.user);

  const [unauthorized, setUnauthorized] = useState(false);

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState([]);
  const [refreshProjectsList, setRefreshProjectsList] = useState(false);

  const getProjects = async () => {
    try {
      setLoadingProjects(true);
      const data = await projectsApi.getProjects();
      setProjects(data?.projects);
    } catch (error) {
      console.log("error", error);
      if (error?.response?.status === 403 || error?.response?.status === 401) {
        dispatch(authActions.setUser(null));
        dispatch(authActions.setToken(null));
      }
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    if (refreshProjectsList) {
      getProjects();
    }
  }, [refreshProjectsList]);

  useEffect(() => {
    console.log("unauthorized", unauthorized);
  }, [unauthorized]);

  if (unauthorized || !user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Container>
        <Header />
        <Row>
          {projects && <>
            {projects.map(project => {
              return (
                <Col xs={12} md={4} key={"project_" + project.id} className="my-2">
                  <ProjectCard project={project} setRefreshProjectsList={setRefreshProjectsList} />
                </Col>
              );
            })}
          </>}
          <Col xs={12} md={4} className="my-2">
            <ProjectForm setUnauthorized={setUnauthorized} setRefreshProjectsList={setRefreshProjectsList} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;