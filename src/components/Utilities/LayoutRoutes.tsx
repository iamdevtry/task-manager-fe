import React, { useState } from 'react';
import { Activity } from '../../interfaces';
import { useAppDispatch } from '../../store/hooks';
import { modalActions } from '../../store/Modal.store';
import useSortTasks from '../hooks/useSortTasks';
import ButtonsSort from '../TasksSection/ButtonsSort';
import TaskItem from '../TasksSection/TaskItem/TaskItem';

type Props = {
    title: string;
    activities: Activity[] | [];
};

const LayoutRoutes: React.FC<Props> = ({ title, activities }) => {
    console.log(activities);
    const [isListInView1, setIsListInView1] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    // const { sortedBy, setSortedBy, sortedTasks } = useSortTasks(activities);

    const openModalHandler = () => {
        dispatch(modalActions.openModalCreateTask());
    };

    const tasksTitle = `${title} (${activities.length} ${
        activities.length === 1 ? 'task' : 'tasks'
    })`;

    return (
        <section>
            <h1 className="font-medium my-5 text-center sm:text-left sm:my-8 md:text-2xl text-lg dark:text-slate-200">
                {tasksTitle}
            </h1>
            {/* <ButtonsSort
                isListInView1={isListInView1}
                setIsListInView1={setIsListInView1}
                sortedBy={sortedBy}
                setSortedBy={setSortedBy}
            /> */}
            <ul
                className={`tasksList mt-4 grid gap-2 sm:gap-4 xl:gap-6 ${
                    isListInView1
                        ? 'grid-cols-1'
                        : '2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 items-end'
                }`}
            >
                {activities.map((act) => (
                    <TaskItem key={act.id} isListInView1={isListInView1} activity={act} />
                ))}
                <li>
                    <button
                        onClick={openModalHandler}
                        className={`border-2 border-slate-300
             text-slate-400 w-full rounded-lg
              border-dashed transition hover:bg-slate-300
               hover:text-slate-500
               dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300 ${
                   isListInView1 ? 'h-20 sm:h-32' : 'h-52 sm:h-64'
               }`}
                    >
                        Add new task
                    </button>
                </li>
            </ul>
        </section>
    );
};

export default React.memo(LayoutRoutes);
