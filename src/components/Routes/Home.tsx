import LayoutRoutes from '../Utilities/LayoutRoutes';
import { useAppSelector } from '../../store/hooks';
import useDescriptionTitle from '../hooks/useDescriptionTitle';

const Home = () => {
    const activities = useAppSelector((state) => state.tasks.activities);

    useDescriptionTitle('Organize your tasks', 'All tasks');

    return <LayoutRoutes title="All activities" activities={activities}></LayoutRoutes>;
};

export default Home;
