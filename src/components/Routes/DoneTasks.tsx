import React from 'react';
import { useAppSelector } from '../../store/hooks';
import useCompletedTasks from '../hooks/useCompletedTasks';
import useDescriptionTitle from '../hooks/useDescriptionTitle';
import LayoutRoutes from '../Utilities/LayoutRoutes';

const DoneTasks: React.FC<{ done: boolean; title: string }> = ({ done, title }) => {
    const activities = useAppSelector((state) => state.tasks.activities);

    const { activities: tasksFiltered } = useCompletedTasks({ activities, done });

    useDescriptionTitle('All tasks done', title);

    return <LayoutRoutes title={title} activities={tasksFiltered}></LayoutRoutes>;
};

export default DoneTasks;
