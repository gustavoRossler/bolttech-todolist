import { useEffect } from 'react';
import { useState } from 'react';
import { OverlayTrigger, Card, Tooltip, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import projectsApi from '../../api/projectsApi';
import tasksApi from '../../api/tasksApi';
import TaskForm from '../TaskForm/TaskForm';

function ProjectCard({ project, setRefreshProjectsList }) {
  const [tasks, setTasks] = useState([]);
  const [refreshTasksList, setRefreshTasksList] = useState(false);

  async function getTasks() {
    try {
      const data = await tasksApi.getTasks({ projectId: project?.id });
      console.log("data", data);
      setTasks(data?.tasks);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    if (refreshTasksList)
      getTasks();
  }, [refreshTasksList]);

  async function deleteProject(id) {
    try {
      setRefreshProjectsList(false);
      const res = await projectsApi.deleteProject({ id });
      setRefreshProjectsList(true);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function deleteTask(id) {
    try {
      setRefreshTasksList(false);
      const res = await tasksApi.deleteTask({ id });
      setRefreshTasksList(true);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function setTaskDone(task) {
    try {
      setRefreshTasksList(false);
      const res = await tasksApi.updateTask({ ...task, done: true, terminationDate: new Date() });
      setRefreshTasksList(true);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function setTaskNotDone(task) {
    try {
      setRefreshTasksList(false);
      const res = await tasksApi.updateTask({ ...task, done: false, terminationDate: null });
      setRefreshTasksList(true);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <Card>
      <Card.Title className='border-bottom py-2 d-flex align-items-center gap-2 justify-content-center'>
        {project.name}
        <FaTrash size={15} onClick={() => deleteProject(project.id)} role="button" style={{ color: "blue" }} />
      </Card.Title>
      <Card.Body className="text-start">
        <h5>To Do</h5>
        {tasks && tasks.filter(item => item.done === false).map(task => <>
          <p key={"task_" + task.id} className="d-flex align-items-center gap-2">
            <input type="checkbox" onClick={() => setTaskDone(task)} />
            {task.description}
            <FaTrash size={15} onClick={() => deleteTask(task.id)} role="button" style={{ color: "blue" }} />
          </p>
        </>)}
        <h5>Done</h5>
        {tasks && tasks.filter(item => item.done === true).map(task => <>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                Finished on <strong>{task?.terminationDate}</strong>.
              </Tooltip>
            }
          >
            <p key={"task_" + task.id} className="d-flex align-items-center gap-2">
              <input type="checkbox" checked onClick={() => setTaskNotDone(task)} />
              {task.description}
            </p>
          </OverlayTrigger>
        </>)}
      </Card.Body>
      <Card.Footer>
        <TaskForm project={project} setRefreshTasksList={setRefreshTasksList} />
      </Card.Footer>
    </Card>
  );
}

export default ProjectCard;