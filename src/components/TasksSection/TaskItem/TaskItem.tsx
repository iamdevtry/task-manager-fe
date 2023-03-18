import React from 'react';
import { Task } from '../../../interfaces';
import { Link } from 'react-router-dom';
import InfosTask from './InfosTask';
import ActionsTaskItem from './ActionsTaskItem';

import { Activity } from '../../../model/model';

const TaskItem: React.FC<{ isListInView1: boolean; activity: Activity }> = ({
    isListInView1,
    activity,
}) => {
    return (
        <>
            <li key={activity.id} style={{ height: '100%' }}>
                {/* <Link
                    to={`/dir/${activity.task_id}`}
                    title={activity.title}
                    className="ml-auto mr-4 w-min whitespace-nowrap overflow-hidden max-w-[10rem] text-center text-ellipsis bg-rose-200 text-rose-600 px-4 py-1 rounded-t-md transition dark:bg-slate-700 dark:text-slate-200 block hover:bg-rose-300 dark:hover:bg-rose-500"
                >
                    {activity.title}
                </Link> */}
                <article
                    className={`bg-slate-100 rounded-lg p-3 sm:p-4 flex text-left transition hover:shadow-lg hover:shadow-slate-300 dark:bg-slate-800 dark:hover:shadow-transparent ${
                        isListInView1 ? 'flex-row sm:h-32' : 'flex-col h-52 sm:h-64'
                    }`}
                    style={{ height: '100%' }}
                >
                    <InfosTask activity={activity} isListInView1={isListInView1} />
                    <ActionsTaskItem activity={activity} isListInView1={isListInView1} />
                </article>
            </li>
        </>
    );
};

export default React.memo(TaskItem);
