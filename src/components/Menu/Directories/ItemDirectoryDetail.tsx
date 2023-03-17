import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import ModalConfirm from '../../Utilities/ModalConfirm';
import ModalDirectory from '../../Utilities/ModalDirectory';
import { tasksActions } from '../../../store/Tasks.store';
import { ReactComponent as Trash } from '../../../assets/trash.svg';
import { ReactComponent as Edit } from '../../../assets/edit.svg';
import { TaskDirectory } from '../../../model/model';
const ItemDirectoryDetail = (props: any) => {
    const dir: TaskDirectory = props.dir;
    const route = useLocation();

    const dispatch = useAppDispatch();

    const [modalIsShown, setModalIsShown] = useState<boolean>(false);
    const [modalDirIsShown, setModalDirIsShown] = useState<boolean>(false);

    const closeModalDirectoryHandler = () => {
        setModalDirIsShown(false);
    };

    const deleteDirectoryHandler = () => {
        dispatch(tasksActions.deleteDirectory(dir.title));
    };

    const confirmEditDirNameHandler = (dirName: string) => {
        // dispatch(
        //     tasksActions.editDirectoryName({
        //         previousDirName: dir,
        //         newDirName: dirName,
        //     })
        // );
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

            <li className="mr-5">
                <div
                    style={{ minWidth: '300px' }}
                    className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                    <NavLink to={`/dir/${dir.id}`} title={dir.title}>
                        <h5 className="hover:text-rose-600 dark:hover:text-slate-200 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {dir.title}
                        </h5>
                    </NavLink>
                    <i>{dir.description}</i>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {dir.content}
                    </p>

                    <div className="ml-auto buttonsDir">
                        <NavLink
                            to={`/dir/${dir.id}`}
                            title={dir.title}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            style={{ backgroundColor: '#7C3AED' }}
                        >
                            View activities
                            <svg
                                aria-hidden="true"
                                className="w-4 h-4 ml-2 -mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </NavLink>
                        <button
                            className="hover:text-rose-600 ml-5"
                            title="edit directory name"
                            onClick={() => setModalDirIsShown(true)}
                        >
                            <Edit className="w-5 h-5 mr-2" />
                        </button>
                        <button
                            className="hover:text-rose-600"
                            title="delete directory"
                            onClick={() => setModalIsShown(true)}
                        >
                            <Trash className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </li>
        </>
    );
};
export default ItemDirectoryDetail;
