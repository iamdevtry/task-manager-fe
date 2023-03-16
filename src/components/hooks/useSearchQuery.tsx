import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';

import { Activity } from '../../model/model';

const useSearchQuery = (searchQuery: string) => {
    const tasks = useAppSelector((state) => state.tasks.activities);

    const [matchedTasks, setMatchedTasks] = useState<Activity[]>([]);

    useEffect(() => {
        const filteredTasks = tasks.filter((task: Activity) => {
            return task.title.toLowerCase().includes(searchQuery.toLowerCase());
        });
        if (searchQuery.trim().length) {
            setMatchedTasks(filteredTasks);
        } else {
            setMatchedTasks([]);
        }
    }, [searchQuery, tasks]);

    return matchedTasks;
};

export default useSearchQuery;
