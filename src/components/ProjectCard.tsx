import React from 'react';
import {Card} from 'react-bootstrap';
import {Project} from "../models/Project";
import {useNavigate} from "react-router-dom";

interface ProjectCardProps {
    project: Project;
    index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({project, index}) => {
    const navigate = useNavigate();
    const handleNavigateToProject = () => {
        navigate('/projects/' + project.id);
    };
    return (
        <Card className={`mb-1 card-hover border-hover ${index % 2 === 0 ? 'bg-light' : ''}`}
              onClick={handleNavigateToProject}>
            <Card.Body>
                <Card.Title>{project.name}</Card.Title>
                <Card.Text>{project.id}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ProjectCard;