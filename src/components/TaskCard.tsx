import React, {useState} from 'react';
import {useSwipeable} from 'react-swipeable';
import {Button, Card, Col, Row} from 'react-bootstrap';
import {format} from 'date-fns';
import {Task} from "../models/Task";

interface TaskCardProps {
    task: Task;
    index: number;
    onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({task, index, onDelete}) => {
    const [isSwiping, setIsSwiping] = useState(false);
    const [isDeletionReady, setDeletionReady] = useState(false);
    const [swipeDistance, setSwipeDistance] = useState(0);
    const minSwipeDistance = 128; // Minimum swipe distance in pixels

    const swipeHandlers = useSwipeable({
        onSwiping: (eventData) => {
            eventData.event.preventDefault(); // Prevent scrolling
            setIsSwiping(true);
            setSwipeDistance(eventData.deltaX);
            setDeletionReady(Math.abs(eventData.deltaX) >= minSwipeDistance);
        },
        onSwiped: () => {
            if (Math.abs(swipeDistance) >= minSwipeDistance) {
                onDelete(task.id ?? (() => {
                    throw new Error("Task ID is undefined");
                })());
            }
            setIsSwiping(false);
            setSwipeDistance(0);
            setDeletionReady(false);
        },
        onTouchStartOrOnMouseDown: (eventData) => {
            eventData.event.preventDefault(); // Prevent scrolling
            setIsSwiping(true);
        },
        onTouchEndOrOnMouseUp: (eventData) => {
            eventData.event.preventDefault(); // Prevent scrolling
            setIsSwiping(false);
            setSwipeDistance(0);
            setDeletionReady(false);
        },
        preventScrollOnSwipe: true,
        trackMouse: false,
        swipeDuration: 2000,
        delta: minSwipeDistance,
    });

    return (
        <Card
            //{...swipeHandlers}
            className={`mb-1 card-hover border-hover ${isDeletionReady ? 'bg-danger' : index % 2 === 0 ? 'bg-light' : ''} ${
                isSwiping ? 'swiping' : ''
            }`}
            style={{transform: `translateX(${swipeDistance}px)`}}
        >
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