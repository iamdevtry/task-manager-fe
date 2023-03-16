import { useEffect, useState } from 'react';
import { Task } from '../../interfaces';

import { Activity } from '../../model/model';

interface Props {
    activities: Activity[];
    done: boolean;
}

const useCompletedTasks = (props: Props): { activities: Activity[] } => {
    const [activities, setTasks] = useState<Activity[]>([]);

    useEffect(() => {
        const filteredTasks: Activity[] = props.activities.filter((act: Activity) => {
            if (props.done) {
                return act.status;
            } else {
                return !act.status;
            }
        });
        setTasks(filteredTasks);
    }, [props.activities, props.done]);

    return { activities };
};

export default useCompletedTasks;
