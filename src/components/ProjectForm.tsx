import React from 'react';
import {Card} from 'react-bootstrap';
import {Project} from "../models/Project";
import {useNavigate} from "react-router-dom";

interface ProjectFormProps {
    project: Project;
}

const ProjectForm: React.FC<ProjectFormProps> = ({project}) => {
    const navigate = useNavigate();
    const handleNavigateToProject = () => {
        navigate('/projects/' + project.id);
    };
    return (
        <Card className={`mb-1`} onClick={handleNavigateToProject}>
            <Card.Body>
                <Card.Title>{project.name}</Card.Title>
                <Card.Text>{project.id}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ProjectForm;