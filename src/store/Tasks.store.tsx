import { Action, createSlice, Dispatch, MiddlewareAPI, PayloadAction } from '@reduxjs/toolkit';
import { Activity, Task, TaskDirectory } from '../interfaces';

import taskManagerApi from '../api/taskManagerApi';
import AuthService from '../services/auth/authServices';
import { ActivityCreate } from '../model/model';

const defaultTasks: Task[] = [
    {
        title: 'Task 1',
        important: false,
        description: 'This is the description for this task',
        date: '2023-04-12',
        dir: 'Main',
        completed: true,
        id: 't1',
    },
    {
        title: 'Task 2',
        important: true,
        description: 'This is the description for this task',
        date: '2023-05-15',
        dir: 'Main',
        completed: true,
        id: 't2',
    },
    {
        title: 'Task 3',
        important: false,
        description: 'This is the description for this task',
        date: '2023-08-21',
        dir: 'Main',
        completed: false,
        id: 't3',
    },
];

const defaultDirectories: TaskDirectory[] = [
    {
        id: 7,
        title: 'day la title cua task',
        description: 'day la mo ta',
        content: 'day la content',
        hours: 0.5,
        planned_start_date: '2023-02-13T12:06:48+07:00',
        planned_end_date: '2023-02-13T12:06:48+07:00',
        created_at: '2023-03-14T00:28:24+07:00',
        status: 0,
    },
    {
        id: 8,
        title: 'day la title cua task',
        description: 'day la mo ta',
        content: 'day la content',
        hours: 0.5,
        planned_start_date: '2023-02-13T12:06:48+07:00',
        planned_end_date: '2023-02-13T12:06:48+07:00',
        created_at: '2023-03-14T00:28:37+07:00',
        status: 0,
    },
    {
        id: 9,
        title: 'day la title cua task',
        description: 'day la mo ta',
        content: 'day la content',
        hours: 0.5,
        planned_start_date: '2023-02-13T12:06:48+07:00',
        planned_end_date: '2023-02-13T12:06:48+07:00',
        created_at: '2023-03-14T00:28:48+07:00',
        status: 0,
    },
    {
        id: 10,
        title: 'day la title cua task',
        description: 'day la mo ta',
        content: 'day la content',
        hours: 0.5,
        planned_start_date: '2023-02-13T00:06:48+07:00',
        planned_end_date: '2023-02-13T12:06:48+07:00',
        created_at: '2023-03-14T00:35:09+07:00',
        status: 0,
    },
    {
        id: 11,
        title: 'day la title cua task',
        description: 'day la mo ta',
        content: 'day la content',
        hours: 0.5,
        planned_start_date: '2023-01-13T15:06:48+07:00',
        planned_end_date: '2023-01-13T15:06:48+07:00',
        created_at: '2023-03-14T00:49:18+07:00',
        status: 0,
    },
    {
        id: 12,
        title: 'day la title cua task',
        description: 'day la mo ta',
        content: 'day la content',
        hours: 0.5,
        planned_start_date: '2023-01-15T15:06:48+07:00',
        planned_end_date: '2023-01-15T15:06:48+07:00',
        created_at: '2023-03-14T00:50:48+07:00',
        status: 0,
    },
    {
        id: 13,
        title: 'day la title cua task',
        description: 'day la mo ta',
        content: 'day la content',
        hours: 0.5,
        planned_start_date: '2023-01-15T15:06:48+07:00',
        planned_end_date: '2023-01-15T15:06:48+07:00',
        created_at: '2023-03-14T00:54:14+07:00',
        status: 0,
    },
    {
        id: 21,
        title: 'day la title cua task',
        description: 'day la mo ta',
        content: 'day la content',
        hours: 0.5,
        planned_start_date: '2023-02-15T15:06:48+07:00',
        planned_end_date: '2023-02-15T16:06:48+07:00',
        created_at: '2023-03-14T15:28:57+07:00',
        status: 0,
    },
    {
        id: 22,
        title: 'day la title cua task',
        description: 'day la mo ta',
        content: 'day la content',
        hours: 0.5,
        planned_start_date: '2023-02-15T15:06:48+07:00',
        planned_end_date: '2023-02-15T16:06:48+07:00',
        created_at: '2023-03-14T18:25:33+07:00',
        status: 0,
    },
    {
        id: 4,
        title: 'day la title cua task',
        description: 'day la mo ta',
        content: 'content',
        hours: 0.5,
        planned_start_date: '2023-03-13T21:06:48+07:00',
        planned_end_date: '2023-03-13T21:06:48+07:00',
        created_at: '2023-03-14T00:07:00+07:00',
        status: 0,
    },
    {
        id: 5,
        title: 'day la title cua task',
        description: 'day la mo ta',
        content: 'content',
        hours: 0.5,
        planned_start_date: '2023-03-13T21:06:48+07:00',
        planned_end_date: '2023-03-13T21:06:48+07:00',
        created_at: '2023-03-14T00:22:17+07:00',
        status: 0,
    },
    {
        id: 6,
        title: 'day la title cua task',
        description: 'day la mo ta',
        content: 'content',
        hours: 0.5,
        planned_start_date: '2023-03-13T21:06:48+07:00',
        planned_end_date: '2023-03-13T21:06:48+07:00',
        created_at: '2023-03-14T00:22:32+07:00',
        status: 0,
    },
];

const getSavedDirectories = (): TaskDirectory[] => {
    // let dirList: string[] = [];
    // if (localStorage.getItem('directories')) {
    //     dirList = JSON.parse(localStorage.getItem('directories')!);
    //     const mainDirExists = dirList.some((dir: string) => dir === 'Main');
    //     if (!mainDirExists) {
    //         dirList.push('Main');
    //     }
    // } else {
    //     dirList.push('Task 1');
    // }

    // if (localStorage.getItem('tasks')) {
    //     const savedTasksList = JSON.parse(localStorage.getItem('tasks')!);
    //     let dirNotSaved: string[] = [];
    //     savedTasksList.forEach((task: Task) => {
    //         if (!dirList.includes(task.dir)) {
    //             if (!dirNotSaved.includes(task.dir)) {
    //                 dirNotSaved.push(task.dir);
    //             }
    //         }
    //     });
    //     dirList = [...dirList, ...dirNotSaved];
    // }
    let dirList: TaskDirectory[] = [];
    taskManagerApi
        .getListTask()
        .then((res) => {
            dirList = res.data;
            console.log(dirList);
            return dirList;
        })
        .catch((err) => {
            console.log(err.response.data);
        });

    return dirList;
};

const initialState: {
    tasks: Task[];
    directories: TaskDirectory[];
} = {
    tasks: localStorage.getItem('tasks')
        ? JSON.parse(localStorage.getItem('tasks')!)
        : defaultTasks,
    // directories: getSavedDirectories(),
    directories: defaultDirectories,
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addNewTask(state, action: PayloadAction<ActivityCreate>) {
            // state.tasks = [action.payload, ...state.tasks];
            console.log(action.payload);
        },
        removeTask(state, action) {
            const newTasksList = state.tasks.filter((task) => task.id !== action.payload);
            state.tasks = newTasksList;
        },
        markAsImportant(state, action: PayloadAction<string>) {
            const newTaskFavorited = state.tasks.find((task) => task.id === action.payload);
            newTaskFavorited!.important = !newTaskFavorited!.important;
        },
        editTask(state, action: PayloadAction<ActivityCreate | Activity>) {
            // const taskId = action.payload.id;
            // const newTaskEdited: Task = state.tasks.find((task: Task) => task.id === taskId)!;
            // const indexTask = state.tasks.indexOf(newTaskEdited);
            // state.tasks[indexTask] = action.payload;
        },
        toggleTaskCompleted(state, action: PayloadAction<string>) {
            const taskId = action.payload;

            const currTask = state.tasks.find((task) => task.id === taskId)!;

            currTask.completed = !currTask.completed;
        },
        deleteAllData(state) {
            state.tasks = [];
            // state.directories = ['Main'];
        },
        createDirectory(state, action: PayloadAction<string>) {
            const newDirectory: string = action.payload;
            // const directoryAlreadyExists = state.directories.includes(newDirectory);
            // if (directoryAlreadyExists) return;
            // state.directories = [newDirectory, ...state.directories];
        },
        deleteDirectory(state, action: PayloadAction<string>) {
            const dirName = action.payload;

            // state.directories = state.directories.filter((dir) => dir !== dirName);
            state.tasks = state.tasks.filter((task) => task.dir !== dirName);
        },
        editDirectoryName(
            state,
            action: PayloadAction<{ newDirName: string; previousDirName: string }>
        ) {
            const newDirName: string = action.payload.newDirName;
            const previousDirName: string = action.payload.previousDirName;
            // const directoryAlreadyExists = state.directories.includes(newDirName);
            // if (directoryAlreadyExists) return;

            // const dirIndex = state.directories.indexOf(previousDirName);

            // state.directories[dirIndex] = newDirName;
            state.tasks.forEach((task) => {
                if (task.dir === previousDirName) {
                    task.dir = newDirName;
                }
            });
        },
    },
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;

export const tasksMiddleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    const nextAction = next(action);
    const actionChangeOnlyDirectories = tasksActions.createDirectory.match(action);

    const isADirectoryAction: boolean = action.type.toLowerCase().includes('directory');

    if (action.type.startsWith('tasks/') && !actionChangeOnlyDirectories) {
        const tasksList = store.getState().tasks.tasks;
        localStorage.setItem('tasks', JSON.stringify(tasksList));
    }
    if (action.type.startsWith('tasks/') && isADirectoryAction) {
        const dirList = store.getState().tasks.directories;
        localStorage.setItem('directories', JSON.stringify(dirList));
    }

    if (tasksActions.deleteAllData.match(action)) {
        localStorage.removeItem('tasks');
        localStorage.removeItem('directories');
        localStorage.removeItem('darkmode');
    }

    if (tasksActions.removeTask.match(action)) {
        console.log(JSON.parse(localStorage.getItem('tasks')!));
        if (localStorage.getItem('tasks')) {
            const localStorageTasks = JSON.parse(localStorage.getItem('tasks')!);
            if (localStorageTasks.length === 0) {
                localStorage.removeItem('tasks');
            }
        }
    }
    return nextAction;
};
