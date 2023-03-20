import { Action, createSlice, Dispatch, MiddlewareAPI, PayloadAction } from '@reduxjs/toolkit';

import taskManagerApi from '../api/taskManagerApi';
import { Activity, ActivityCreate, TaskDirectory } from '../model/model';

const getInitValue = () => {
    taskManagerApi.getListTask().then((res) => {
        localStorage.setItem('taskDirectories', JSON.stringify(res.data));
    });
    taskManagerApi.getListActivity().then((res) => {
        localStorage.setItem('activity', JSON.stringify(res.data));
    });
};
getInitValue();

const initialState: {
    activities: Activity[];
    directories: TaskDirectory[];
} = {
    activities: localStorage.getItem('activity')
        ? JSON.parse(localStorage.getItem('activity')!)
        : [],
    directories: localStorage.getItem('taskDirectories')
        ? JSON.parse(localStorage.getItem('taskDirectories')!)
        : [],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addNewTask(state, action: PayloadAction<ActivityCreate>) {
            // state.tasks = [action.payload, ...state.tasks];
            console.log(action.payload);
            taskManagerApi.addActivity(action.payload).then((res) => {
                console.log(res);
            });
        },
        removeTask(state, action) {
            // const newTasksList = state.activities.filter((act) => act.id !== action.payload);
            // state.activities = newTasksList;
            console.log(action);
        },
        markAsImportant(state, action: PayloadAction<string>) {
            // const newTaskFavorited = state.activities.find((act) => act.id === action.payload);
            // newTaskFavorited!.important = !newTaskFavorited!.important;
        },
        editTask(state, action: PayloadAction<ActivityCreate | Activity>) {
            // const taskId = action.payload.id;
            // const newTaskEdited: Task = state.tasks.find((task: Task) => task.id === taskId)!;
            // const indexTask = state.tasks.indexOf(newTaskEdited);
            // state.tasks[indexTask] = action.payload;
            console.log(action.payload);
        },
        toggleTaskCompleted(state, action: PayloadAction<string>) {
            const taskId = action.payload;
            const currTask = state.activities.find((act) => act.id + '' === taskId)!;
            console.log(state.activities);
            console.log(currTask);
        },
        deleteAllData(state) {
            state.activities = [];
            state.directories = [];
        },
        createDirectory(state, action: PayloadAction<string>) {
            const newDirectory: string = action.payload;
            // const directoryAlreadyExists = state.directories.includes(newDirectory);
            // if (directoryAlreadyExists) return;
            // state.directories = [newDirectory, ...state.directories];
        },
        deleteDirectory(state, action: PayloadAction<string>) {
            // const dirName = action.payload;
            // state.directories = state.directories.filter((dir) => dir !== dirName);
            // state.tasks = state.tasks.filter((task) => task.dir !== dirName);
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
            state.activities.forEach((act) => {
                if (act.title === previousDirName) {
                    act.title = newDirName;
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
        console.log(JSON.parse(localStorage.getItem('activity')!));
        if (localStorage.getItem('activity')) {
            const localStorageTasks = JSON.parse(localStorage.getItem('activity')!);
            if (localStorageTasks.length === 0) {
                localStorage.removeItem('activity');
            }
        }
    }
    return nextAction;
};
