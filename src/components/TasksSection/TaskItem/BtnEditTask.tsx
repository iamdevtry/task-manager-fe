import React, { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { tasksActions } from '../../../store/Tasks.store';
import ModalCreateTask from '../../Utilities/ModalTask';
import { ReactComponent as OptionsSvg } from '../../../assets/options.svg';
import { Task } from '../../../interfaces';
import { Activity, ActivityCreate } from '../../../model/model';

const BtnEditTask: React.FC<{ task: Task }> = ({ task }) => {
    const [modalEditTaskOpen, setModalEditTaskOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const closeModalEditTask = () => {
        setModalEditTaskOpen(false);
    };

    const openModalEditTask = () => {
        setModalEditTaskOpen(true);
    };

    const editTaskHandler = (activity: Activity | ActivityCreate) => {
        dispatch(tasksActions.editTask(activity));
    };

    return (
        <>
            <button
                title="edit task"
                className="transition w-7 sm:w-8 h-6 sm:h-8 grid place-items-center dark:hover:text-slate-200 hover:text-slate-700"
                onClick={openModalEditTask}
            >
                <OptionsSvg className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
            {modalEditTaskOpen && (
                <ModalCreateTask
                    onClose={closeModalEditTask}
                    // activity={activity}
                    nameForm="Edit task"
                    onConfirm={editTaskHandler}
                />
            )}
        </>
    );
};

export default BtnEditTask;
