import React from 'react';
import {Button, Card, Col, Row} from 'react-bootstrap';
import {format} from 'date-fns';
import {Task} from "../models/Task";

interface TaskCardProps {
    task: Task;
    index: number;
    onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({task, onDelete}) => {

    return (
        <Card className={`mb-1 card-hover border-hover`}>
            <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Row className="align-items-center">
                    <Col>
                        <strong>Start:</strong> {task.start ? format(task.start, 'Pp') : 'Not Specified'}
                    </Col>
                    <Col>
                        <strong>End:</strong> {task.end ? format(task.end, 'Pp') : 'Not Specified'}
                    </Col>
                    <Col className="text-end">
                        <Button variant="danger" onClick={() => onDelete(task.id ?? (() => {
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

export default TaskCard;