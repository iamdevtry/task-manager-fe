import { useState } from 'react';
import ItemDirectoryDetail from '../Menu/Directories/ItemDirectoryDetail';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { TaskDirectory } from '../../model/model';
import ModalDirectory from '../Utilities/ModalDirectory';
import { tasksActions } from '../../store/Tasks.store';

const ListTaskDirectories = () => {
    const directories: TaskDirectory[] = useAppSelector((store) => store.tasks.directories);

    const [modalDirIsShown, setModalDirIsShown] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const createNewDirectoryHandler = (inputValue: string) => {
        const newDirectoryName: string = inputValue.trim();
        if (newDirectoryName.length === 0) return;
        const directoryDoesNotExist = directories.every((dir) => dir.title !== newDirectoryName);
        if (directoryDoesNotExist) {
            dispatch(tasksActions.createDirectory(newDirectoryName));
        }
    };

    const closeModalDirectoryHandler = () => {
        setModalDirIsShown(false);
    };
    return (
        <div className="pt-5 pb-5">
            {modalDirIsShown && (
                <ModalDirectory
                    onClose={closeModalDirectoryHandler}
                    onConfirm={createNewDirectoryHandler}
                    btnText="Create"
                    title="Create new directory"
                />
            )}
            <ul className="flex">
                {directories.map((dir) => (
                    <ItemDirectoryDetail key={dir.id} dir={dir} />
                ))}
                <button
                    onClick={() => setModalDirIsShown(true)}
                    className="p-5 border-slate-300 dark:border-slate-700 border-2 mt-2 rounded-md border-dashed hover:text-violet-500"
                    style={{ minWidth: '300px' }}
                >
                    + New task
                </button>
            </ul>
        </div>
    );
};

export default ListTaskDirectories;
