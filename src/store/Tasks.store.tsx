import { Action, createSlice, Dispatch, MiddlewareAPI, PayloadAction } from '@reduxjs/toolkit';

import taskManagerApi from '../api/taskManagerApi';
import { Activity, ActivityCreate, TaskDirectory } from '../model/model';

const getInitValue = () => {
    taskManagerApi.getListTask().then((res) => {
        localStorage.removeItem('taskDirectories');
        localStorage.setItem('taskDirectories', JSON.stringify(res.data));
    });
    taskManagerApi.getListActivity().then((res) => {
        localStorage.removeItem('activity');
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
            console.log(action.payload);
            taskManagerApi.addActivity(action.payload).then((res) => {
                taskManagerApi.getListActivity().then((res) => {
                    localStorage.removeItem('activity');
                    localStorage.setItem('activity', JSON.stringify(res.data));
                    window.location.reload();
                });
            });
        },
        removeTask(state, action) {
            // const newTasksList = state.activities.filter((act) => act.id !== action.payload);
            // state.activities = newTasksList;
            console.log(action);
            taskManagerApi.deleteActivity(action.payload).then((res) => {
                console.log(res);
                const newTasksList = state.activities.filter((act) => act.id !== action.payload);
                state.activities = newTasksList;
                localStorage.removeItem('activity');
                localStorage.setItem('activity', JSON.stringify(newTasksList));
                window.location.reload();
            });
        },
        markAsImportant(state, action: PayloadAction<string>) {
            // const newTaskFavorited = state.activities.find((act) => act.id === action.payload);
            // newTaskFavorited!.important = !newTaskFavorited!.important;
        },
        editTask(state, action: PayloadAction<ActivityCreate | Activity>) {
            console.log(action.payload);

            //find activity in local storage
            const newTaskEdited: Activity = state.activities.find(
                (act) => act.id === action.payload.id
            )!;
            const indexTask = state.activities.indexOf(newTaskEdited);

            taskManagerApi.updateActivity(action.payload).then((res) => {
                console.log(res);
            });
            state.activities[indexTask].title = action.payload.title;
            state.activities[indexTask].task_id = action.payload.task_id;
            state.activities[indexTask].description = action.payload.description;
            state.activities[indexTask].content = action.payload.content;
            state.activities[indexTask].planned_start_date = action.payload.planned_start_date;
            state.activities[indexTask].planned_end_date = action.payload.planned_end_date;
            state.activities[indexTask].status = action.payload.status;
        },
        toggleTaskCompleted(state, action: PayloadAction<string>) {
            const taskId = action.payload;
            console.log(taskId);

            //update status of activity in local storage
            const newTaskCompleted: Activity = state.activities.find(
                (act) => act.id === parseInt(taskId)
            )!;
            const indexTask = state.activities.indexOf(newTaskCompleted);
            if (state.activities[indexTask].status === 1) {
                taskManagerApi.updateStatusActivity({
                    id: state.activities[indexTask].id,
                    status: 0,
                });
                state.activities[indexTask].status = 0;
            } else {
                taskManagerApi.updateStatusActivity({
                    id: state.activities[indexTask].id,
                    status: 1,
                });
                state.activities[indexTask].status = 1;
            }
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
            const taskIndex = localStorageTasks.findIndex(
                (task: Activity) => task.id === action.payload
            );

            localStorageTasks.splice(taskIndex, 1);
            localStorage.setItem('activity', JSON.stringify(localStorageTasks));

            if (localStorageTasks.length === 0) {
                localStorage.removeItem('activity');
            }
        }
    }
    return nextAction;
};
