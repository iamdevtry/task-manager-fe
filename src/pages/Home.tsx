import AccountData from '../components/AccountSection/AccountData';
import Footer from '../components/Footer';
import Menu from '../components/Menu/Menu';
import TasksSection from '../components/TasksSection/TasksSection';
import ModalCreateTask from '../components/Utilities/ModalTask';
import { ActivityCreate } from '../model/model';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { modalActions } from '../store/Modal.store';
import { tasksActions } from '../store/Tasks.store';

const HomePage = () => {
    const modal = useAppSelector((state) => state.modal);

    const dispatch = useAppDispatch();

    const closeModalCreateTask = () => {
        dispatch(modalActions.closeModalCreateTask());
    };

    const createNewActivityHandler = (newActivity: ActivityCreate) => {
        dispatch(tasksActions.addNewTask(newActivity));
    };

    return (
        <div className="bg-slate-200 min-h-screen text-slate-600 dark:bg-slate-900 dark:text-slate-400 xl:text-base sm:text-sm text-xs">
            {modal.modalCreateTaskOpen && (
                <ModalCreateTask
                    onClose={closeModalCreateTask}
                    nameForm="Add a task"
                    onConfirm={createNewActivityHandler}
                />
            )}
            <Menu />
            <TasksSection />
            <Footer />
            <AccountData />
        </div>
    );
};

export default HomePage;
