import React, {useCallback, useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Col, Row, Stack} from 'react-bootstrap';
import {Project} from "../models/Project";
import {deleteProjectFromIndexedDbById, loadProjectFromIndexedDb, saveProjectToIndexedDb} from "../db/projectsDb";
import {useNavigate, useParams} from "react-router-dom";
import ProjectForm from "../components/ProjectForm";

const ProjectDetails: React.FC = () => {
    const [project, setProject] = useState<Project>();

    const params = useParams();
    const projectId = Number(params.projectId);
    useEffect(() => {
        const fetchProject = async () => {
            if (projectId) {
                const loadedProject: Project = await loadProjectFromIndexedDb(projectId);
                setProject(loadedProject);
            }
        };
        fetchProject();
    }, [projectId]);

    useEffect(() => {
        if (project) {
            saveProjectToIndexedDb(project);
        }
    }, [project]);

    const navigate = useNavigate();
    const handleDelete = useCallback(
        async () => {
            await deleteProjectFromIndexedDbById(projectId)
                .then(() => navigate('/projects'));
        },
        [projectId, navigate]
    );
    const handleNavigateToProjectList = () => {
        navigate('/projects');
    };

    return (
        <Container fluid className="align-items-center justify-content-center mw-100">
            <Row className="mb-3 App-header">
                <Col className="d-flex justify-content-between align-items-center">
                    <Stack className="flex-grow-1 text-center mx-3">
                        <div className="w-100">
                            <h1 className="m-0">Project{project ? ': ' + project.name : ''}</h1>
                        </div>
                    </Stack>
                </Col>
            </Row>
            <Row>
                <Stack direction="horizontal" gap={3}>
                    <Col className="w-75">
                        <Row className="mb-3 column-gap-2">
                            <Col xs={6} sm={6} md={4} lg={3} xl={2}>
                                <Row className="flex-fill">
                                    <Button onClick={handleNavigateToProjectList}>All Projects</Button>
                                </Row>
                            </Col>
                            <Col xs={6} sm={6} md={4} lg={3} xl={2}>
                                <Row className="flex-fill">
                                    <Button onClick={handleDelete}>Delete</Button>
                                </Row>
                            </Col>
                        </Row>
                        <h2>Today's Tasks:</h2>
                        {project ?
                            <ProjectForm key={project.id} project={project}/> :
                            <p>project not found</p>
                        }
                    </Col>
                </Stack>
            </Row>
        </Container>
    );
};

export default ProjectDetails;