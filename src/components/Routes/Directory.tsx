import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import useDescriptionTitle from '../hooks/useDescriptionTitle';
import LayoutRoutes from '../Utilities/LayoutRoutes';

import { Activity, TaskDirectory } from '../../model/model';
const Directory: React.FC = () => {
    const activities = useAppSelector((state) => state.tasks.activities);
    const directories = useAppSelector((state) => state.tasks.directories);
    const params = useParams();
    const navigate = useNavigate();

    useDescriptionTitle(`Tasks in "${params.dir}"`, params.dir ? params.dir + ' directory' : '');

    const [tasksInCurrentDirectory, setTasksInCurrentDirectory] = useState<Activity[]>([]);
    const [currentTaskDirectory, setCurrentTaskDirectory] = useState<TaskDirectory>();

    useEffect(() => {
        // const dirExists = directories.includes(params.dir!);
        // if (!dirExists) {
        //     navigate('/');
        // }

        const activitiesFiltered = activities.filter(
            (act: Activity) => act.task_id === Number(params.dir)
        );

        setTasksInCurrentDirectory(activitiesFiltered);

        const currentDir = directories.find((dir: TaskDirectory) => dir.id === Number(params.dir));
        setCurrentTaskDirectory(currentDir);
    }, [directories, navigate, params.dir, activities]);

    return (
        <LayoutRoutes
            title={`${currentTaskDirectory?.title}'s tasks`}
            activities={tasksInCurrentDirectory}
        />
    );
};

export default Directory;
