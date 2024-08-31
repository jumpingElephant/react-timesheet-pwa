import React from 'react';
import {Button, Card, Col, Row} from 'react-bootstrap';
import {Project} from "../models/Project";

interface ProjectCardProps {
    project: Project;
    index: number;
    onDelete: (id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({project, index, onDelete}) => {
    return (
        <Card className={`mb-1 card-hover border-hover ${index % 2 === 0 ? 'bg-light' : ''}`}>
            <Card.Body>
                <Card.Title>{project.name}</Card.Title>
                <Row className="align-items-center">
                    <Col className="text-end">
                        <Button variant="danger" onClick={() => onDelete(project.id ?? (() => {
                            throw new Error("Task ID is undefined");
                        })())}>
                            Delete
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default ProjectCard;