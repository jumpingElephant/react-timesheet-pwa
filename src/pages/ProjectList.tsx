import React, {useCallback, useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Col, Row, Stack} from 'react-bootstrap';
import {deleteProjectFromIndexedDbById, loadProjectsFromIndexedDb, saveProjectsToIndexedDb,} from '../utils/indexedDB';
import {Project} from "../models/Project";

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const loadedProjects = await loadProjectsFromIndexedDb();
            console.log(`loadedProjects.length=${loadedProjects.length}`);
            setProjects(loadedProjects);
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        saveProjectsToIndexedDb(projects);
    }, [projects]);

    const handleDelete = useCallback(
        async (id: number) => {
            const updatedProjects = projects.filter((project) => project.id !== id);
            setProjects(updatedProjects);
            await deleteProjectFromIndexedDbById(id);
        },
        [projects]
    );

    return (
        <Container fluid className="align-items-center justify-content-center mw-100">
            <Row className="mb-3 App-header">
                <Col className="d-flex justify-content-between align-items-center">
                    <Stack className="flex-grow-1 text-center mx-3">
                        <div className="w-100">
                            <h1 className="m-0">Projects</h1>
                        </div>
                    </Stack>
                </Col>
            </Row>
            <Row>
                <Stack direction="horizontal" gap={3}>
                    <Col className="w-75">
                        <Row className="mb-3 column-gap-2">
                            <Col xs={6} sm={6} md={4}>
                                <Row className="flex-fill">
                                    <Button>Create</Button>
                                </Row>
                            </Col>
                            <Col xs={6} sm={6} md={4}>
                                <Row className="flex-fill">
                                    <Button>Include Archived</Button>
                                </Row>
                            </Col>
                        </Row>
                        <h2>Today's Tasks:</h2>
                        {projects.map((project) => (
                            <Button key={project.id} onClick={() => handleDelete(project.id)}>
                                {project.name}
                            </Button>
                        ))}
                    </Col>
                </Stack>
            </Row>
        </Container>
    );
};

export default ProjectList;