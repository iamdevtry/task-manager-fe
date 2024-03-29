import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar1 from '../../assets/avatar-1.jpg';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { menusActions } from '../../store/Menu.store';
import LayoutMenus from '../Utilities/LayoutMenus';
import DarkMode from './DarkMode';
import TasksDone from './TasksDone';

import { User } from '../../interfaces';
import taskManagerApi from '../../api/taskManagerApi';
import authService from '../../services/auth/authServices';
import jwt_decode from 'jwt-decode';
import { TokenDecoded } from '../../interfaces';

import AuthService from '../../services/auth/authServices';
const AccountData: React.FC = () => {
    const navigate = useNavigate();

    const [token, setToken] = React.useState<any>();
    const [infoUser, setInfoUser] = React.useState<User>();

    const [numsTask, setNumsTask] = React.useState<number>(0);
    const [numsTaskDone, setNumsTaskDone] = React.useState<number>(0);
    const [numsActivity, setNumsActivity] = React.useState<number>(0);
    const [numsActivityDone, setNumsActivityDone] = React.useState<number>(0);

    const menuOpen = useAppSelector((state) => state.menu.menuAccountOpened);

    const dispatch = useAppDispatch();

    const closeMenuHandler = () => {
        dispatch(menusActions.closeMenuAccount());
    };

    useEffect(() => {
        const token = authService.getCurrentUser();
        if (!token) {
            navigate('/login');
        }
        setToken(token);
    }, []);

    useEffect(() => {
        // Get the login method from AuthService
        const getUser = async (values: any) => {
            await taskManagerApi
                .getInforUser(values)
                .then((res) => {
                    setInfoUser(res.data);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
        };

        const getNumsTask = async () => {
            await taskManagerApi.countTask().then((res) => {
                setNumsTask(res.data);
            });
        };

        const getNumsTaskDone = async () => {
            await taskManagerApi.countTaskDone().then((res) => {
                setNumsTaskDone(res.data);
            });
        };

        const getNumsActivity = async () => {
            await taskManagerApi.countActivity().then((res) => {
                setNumsActivity(res.data);
            });
        };

        const getNumsActivityDone = async () => {
            await taskManagerApi.countActivityDone().then((res) => {
                setNumsActivityDone(res.data);
            });
        };

        if (token) {
            let decoded: TokenDecoded;
            decoded = jwt_decode(JSON.parse(token).token);
            getUser(decoded.payload.user_id);
            getNumsTask();
            getNumsTaskDone();
            getNumsActivity();
            getNumsActivityDone();
        }
    }, [token]);

    const handleLogout = () => {
        AuthService.removeUser();
        navigate('/login');
    };

    return (
        <LayoutMenus
            menuOpen={menuOpen}
            closeMenuHandler={closeMenuHandler}
            className="top-0 right-0 "
        >
            <section className="p-5 flex flex-col h-full">
                <span className="flex items-center mx-auto">
                    <span className="font-medium">
                        {infoUser && <span>{infoUser.username}</span>}
                    </span>
                    <img src={avatar1} alt="cat" className="w-10 rounded-full ml-4" />
                </span>
                <DarkMode />
                <span className="flex items-center">
                    <button onClick={handleLogout} className="text-cyan-600 hover:underline">
                        Logout
                    </button>
                </span>
                <TasksDone />
                {/* <DeleteTasks /> */}
                <div className="flex flex-col mt-5">
                    <span className="font-medium">
                        <span>Stats</span>
                    </span>
                    <span className="text-sm text-gray-400">Tasks</span>
                    <span className="text-lg font-medium">
                        {numsTaskDone}/{numsTask}
                    </span>
                    <span className="text-sm text-gray-400">Activities</span>
                    <span className="text-lg font-medium">
                        {numsActivityDone}/{numsActivity}
                    </span>
                    <span className="text-sm text-gray-400">Nhóm SV thực hiện:</span>
                    <span className="text-lg font-medium">
                        <ul>
                            <li>Nguyễn Thị Nga</li>
                            <li>Nguyễn Thị Thu Hiền</li>
                            <li>Trần Bình Phong</li>
                            <li>Huỳnh Quốc Việt</li>
                        </ul>
                    </span>
                </div>
                <a
                    href="https://github.com/iamdevtry"
                    className="mt-auto bg-rose-100 p-2 rounded-md text-rose-600 text-center transition hover:bg-rose-200 dark:bg-slate-700/[.3] dark:text-slate-200"
                >
                    Binh Phong Tran
                </a>
            </section>
        </LayoutMenus>
    );
};

export default AccountData;
