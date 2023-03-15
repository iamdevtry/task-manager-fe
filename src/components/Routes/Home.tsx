import { useState, useEffect } from 'react';
import LayoutRoutes from '../Utilities/LayoutRoutes';
import { useAppSelector } from '../../store/hooks';
import useDescriptionTitle from '../hooks/useDescriptionTitle';

import taskManagerApi from '../../api/taskManagerApi';

import { Activity } from '../../model/model';

const Home = () => {
    // const tasks = useAppSelector((state) => state.tasks.tasks);

    useDescriptionTitle('Organize your tasks', 'All tasks');

    const [activites, setActivites] = useState<Activity[]>([]);

    useEffect(() => {
        const getActivites = async () => {
            const response = await taskManagerApi.getListActivity();
            setActivites(response.data);
        };
        getActivites();
    }, []);

    return <LayoutRoutes title="All activities" activities={activites}></LayoutRoutes>;
};

export default Home;
