import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar1 from '../../assets/avatar-1.jpg';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { menusActions } from '../../store/Menu.store';
import LayoutMenus from '../Utilities/LayoutMenus';
import DarkMode from './DarkMode';
import DeleteTasks from './DeleteTasks';
import TasksDone from './TasksDone';

import { User } from '../../interfaces';
import taskManagerApi from '../../api/taskManagerApi';
import authService from '../../services/auth/authServices';
import jwt_decode from 'jwt-decode';
import { TokenDecoded } from '../../interfaces';

const AccountData: React.FC = () => {
    const navigate = useNavigate();

    const [token, setToken] = React.useState<any>();
    const [infoUser, setInfoUser] = React.useState<User>();

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
        if (token) {
            let decoded: TokenDecoded;
            decoded = jwt_decode(JSON.parse(token).token);
            getUser(decoded.payload.user_id);
        }
    }, [token]);

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

                <TasksDone />
                <DeleteTasks />
                <a
                    href="https://github.com/aridsm"
                    className="mt-4 bg-rose-100 p-2 rounded-md text-rose-600 text-center transition hover:bg-rose-200 dark:bg-slate-700/[.3] dark:text-slate-200"
                >
                    Projected by Ariane Morelato
                </a>
            </section>
        </LayoutMenus>
    );
};

export default AccountData;
