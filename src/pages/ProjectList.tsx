import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Col, Row, Stack} from 'react-bootstrap';
import {Project} from "../models/Project";
import ProjectCard from "../components/ProjectCard";
import {loadProjectsFromIndexedDb, saveProjectsToIndexedDb} from "../db/projectsDb";
import {populateInitialData} from "../db/initializeDb";

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const loadedProjects: Project[] = await loadProjectsFromIndexedDb();
            console.log(`loadedProjects.length=${loadedProjects.length}`);
            setProjects(loadedProjects);
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        saveProjectsToIndexedDb(projects);
    }, [projects]);

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
                            <Col xs={6} sm={6} md={4} lg={3} xl={2}>
                                <Row className="flex-fill">
                                    <Button>Create</Button>
                                </Row>
                            </Col>
                            <Col xs={6} sm={6} md={4} lg={3} xl={2}>
                                <Row className="flex-fill">
                                    <Button>Include Archived</Button>
                                </Row>
                            </Col>
                            <Col xs={6} sm={6} md={4} lg={3} xl={2}>
                                <Row className="flex-fill">
                                    <Button onClick={() => {
                                        populateInitialData()
                                            .then(() => window.location.reload());
                                    }}>Reset IndexedDB</Button>
                                </Row>
                            </Col>
                        </Row>
                        <h2>Projects</h2>
                        <Col>
                            {projects.map((project, index) => (
                                <ProjectCard key={project.id} project={project} index={index}/>
                            ))}
                        </Col>
                    </Col>
                </Stack>
            </Row>
        </Container>
    );
};

export default ProjectList;