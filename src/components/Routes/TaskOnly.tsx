import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Task } from '../../interfaces';
import { useAppSelector } from '../../store/hooks';
import useDescriptionTitle from '../hooks/useDescriptionTitle';
import LayoutRoutes from '../Utilities/LayoutRoutes';

import { Activity } from '../../model/model';

const TaskOnly: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();

    const tasks = useAppSelector((store) => store.tasks.activities);

    const [matchedTask, setMatchedTask] = useState<Activity[]>([]);

    useEffect(() => {
        const taskId = params.taskId;
        const filteredTask = tasks.filter((task: Activity) => taskId === task.id.toString());
        if (!filteredTask.length) {
            navigate('/');
        }
        setMatchedTask(filteredTask);
    }, [navigate, params.taskId, tasks]);

    const title = matchedTask.length ? matchedTask[0].title : '';

    useDescriptionTitle(`Searching for ${title}`, 'Task ' + title);

    return <LayoutRoutes title={title} activities={matchedTask} />;
};

export default TaskOnly;
