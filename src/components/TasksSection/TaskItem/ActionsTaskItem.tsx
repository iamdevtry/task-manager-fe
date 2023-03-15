import React from 'react';

import BtnEditTask from './BtnEditTask';
import BtnMarkAsImportant from './BtnMarkAsImportant';
import BtnDeleteTask from './BtnDeleteTask';
import BtnToggleCompleted from './BtnToggleCompleted';

import { Activity } from '../../../model/model';

const ActionsTaskItem: React.FC<{ activity: Activity; isListInView1: boolean }> = ({
    activity,
    isListInView1,
}) => {
    return (
        <>
            <div
                className={`flex border-dashed border-slate-200 dark:border-slate-700/[.3] ${
                    isListInView1 ? 'items-center' : 'border-t-2 w-full pt-4 mt-4'
                }`}
            >
                <BtnToggleCompleted
                    taskCompleted={true}
                    activityId={activity.id + ''}
                    isListInView1={isListInView1}
                />
                {/* <BtnMarkAsImportant taskId={activity.id} taskImportant={activity.important} />
                <BtnDeleteTask taskId={activity.id} />
                <BtnEditTask task={activity} /> */}
            </div>
        </>
    );
};

export default ActionsTaskItem;
