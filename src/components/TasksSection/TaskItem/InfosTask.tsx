import React from 'react';
import { Activity } from '../../../model/model';
import { ReactComponent as Calendar } from '../../../assets/date.svg';
import useDate from '../../hooks/useDate';

const InfosTask: React.FC<{ activity: Activity; isListInView1: boolean }> = ({
    activity,
    isListInView1,
}) => {
    const dateFormated = useDate(activity?.created_at);

    return (
        <div className={`flex flex-col flex-1 ${isListInView1 ? 'mr-6' : ''}`}>
            <div className={`flex items-center justify-between ${isListInView1 ? 'mb-1' : 'mb-2'}`}>
                <span className="block font-medium dark:text-slate-200">{activity.title}</span>
            </div>
            <p
                title={activity.description}
                className={`description mb-2 text-slate-500 dark:text-slate-500 ${
                    isListInView1 ? 'line-clamp-2 sm:line-clamp-1' : 'line-clamp-3'
                }`}
            >
                {activity.description}
            </p>
            <time className="mt-auto flex w-full">
                <Calendar className="mr-2 w-4 sm:w-5" /> {dateFormated}
            </time>
        </div>
    );
};

export default InfosTask;
