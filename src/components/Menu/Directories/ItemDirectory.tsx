import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import { tasksActions } from '../../../store/Tasks.store';
import { ReactComponent as Trash } from '../../../assets/trash.svg';
import { ReactComponent as Edit } from '../../../assets/edit.svg';
import ModalConfirm from '../../Utilities/ModalConfirm';
import ModalDirectory from '../../Utilities/ModalDirectory';

import { TaskDirectory } from '../../../model/model';

const ItemDirectory: React.FC<{ dir: TaskDirectory; classActive: string }> = ({
    dir,
    classActive,
}) => {
    const route = useLocation();
    const currentPath = route.pathname;

    const dispatch = useAppDispatch();

    const [modalIsShown, setModalIsShown] = useState<boolean>(false);
    const [modalDirIsShown, setModalDirIsShown] = useState<boolean>(false);

    const closeModalDirectoryHandler = () => {
        setModalDirIsShown(false);
    };

    const deleteDirectoryHandler = () => {
        dispatch(tasksActions.deleteDirectory(dir.id?.toString()!));
    };

    const confirmEditDirNameHandler = (dirName: string) => {
        dispatch(
            tasksActions.editDirectoryName({
                id: dir.id?.toString()!,
                title: dirName,
            })
        );
    };

    return (
        <>
            {modalDirIsShown && (
                <ModalDirectory
                    onClose={closeModalDirectoryHandler}
                    onConfirm={confirmEditDirNameHandler}
                    dirName={dir.title}
                    title="Edit directory name"
                    btnText="Edit"
                />
            )}
            {modalIsShown && (
                <ModalConfirm
                    onClose={() => setModalIsShown(false)}
                    onConfirm={deleteDirectoryHandler}
                    text="This directory and all its tasks will be deleted."
                />
            )}
            <li
                className={`flex items-center pr-4 pl-9 py-2 itemDirectory ${
                    currentPath === '/dir/' + dir ? classActive : ''
                }`}
            >
                <NavLink
                    to={`/dir/${dir.id}`}
                    title={dir.title}
                    className="hover:text-rose-600 dark:hover:text-slate-200 transition text-ellipsis whitespace-nowrap overflow-hidden max-w-[7rem]"
                >
                    {dir.title}
                </NavLink>

                {dir.title !== 'Main' && (
                    <div className="ml-auto buttonsDir">
                        <button
                            title="edit directory name"
                            onClick={() => setModalDirIsShown(true)}
                        >
                            <Edit className="w-5 h-5 mr-2" />
                        </button>
                        <button title="delete directory" onClick={() => setModalIsShown(true)}>
                            <Trash className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </li>
        </>
    );
};

export default ItemDirectory;
