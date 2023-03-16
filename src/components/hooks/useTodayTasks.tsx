import { useState, useEffect } from 'react';
import { Task } from '../../interfaces';
import { useAppSelector } from '../../store/hooks';

import { Activity } from '../../model/model';
const useTodayTasks = (): Activity[] => {
    const tasks = useAppSelector((state) => state.tasks.activities);
    const [todaysTasks, setTodaysTasks] = useState<Activity[]>([]);

    const date: Date = new Date();
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();

    const dateTimeFormat = `${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}`;

    useEffect(() => {
        let filteredTasks: Activity[] = tasks.filter(
            (task: Activity) => task.planned_start_date === dateTimeFormat
        );
        setTodaysTasks(filteredTasks);
    }, [dateTimeFormat, tasks]);
    return todaysTasks;
};

export default useTodayTasks;
