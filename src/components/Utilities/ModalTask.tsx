import React, { useRef, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import Modal from './Modal';

import { ActivityCreate, TaskDirectory } from '../../model/model';
import { getCustomTime } from '../../utils/CustomTime';

import { useCustomDate, useCustomTime } from '../hooks/useDate';
import { Activity, Tag } from '../../model/model';

const InputCheckbox: React.FC<{
    label: string;
    isChecked: boolean;
    setChecked: (value: React.SetStateAction<boolean>) => void;
}> = ({ isChecked, setChecked, label }) => {
    return (
        <label className="mb-0 flex items-center cursor-pointer">
            <div className="mr-2 bg-slate-300/[.5] dark:bg-slate-800 w-5 h-5 rounded-full grid place-items-center border border-slate-300 dark:border-slate-700">
                {isChecked && <span className="bg-rose-500 w-2 h-2 block rounded-full"></span>}
            </div>
            <span className="order-1 flex-1">{label}</span>
            <input
                type="checkbox"
                className="sr-only"
                checked={isChecked}
                onChange={() => setChecked((prev: boolean) => !prev)}
            />
        </label>
    );
};

const ModalCreateTask: React.FC<{
    onClose: () => void;
    activity?: ActivityCreate | Activity;
    nameForm: string;
    onConfirm: (activity: ActivityCreate | Activity) => void;
}> = ({ onClose, activity, nameForm, onConfirm }) => {
    const directories = useAppSelector((state) => state.tasks.directories);

    const today: Date = new Date();
    let day: number = today.getDate();
    let month: number = today.getMonth() + 1;
    const year: number = today.getFullYear();
    if (day < 10) {
        day = +('0' + day);
    }
    if (month < 10) {
        month = +('0' + month);
    }

    const todayDate: string = year + '-' + month + '-' + day;
    const maxDate: string = year + 1 + '-' + month + '-' + day;

    //Description
    const [description, setDescription] = useState<string>(() => {
        if (activity) {
            return activity.description;
        }
        return '';
    });
    //Title
    const [title, setTitle] = useState<string>(() => {
        if (activity) {
            return activity.title;
        }
        return '';
    });
    //Content
    const [content, setContent] = useState<string>(() => {
        if (activity?.content) {
            return activity.content;
        }
        return '';
    });
    //Start Date
    // const [startDate, setStartDate] = useState<string>('');
    let sDate = useCustomDate('yyyy-mm-dd', activity?.planned_start_date!);
    let eDate = useCustomDate('yyyy-mm-dd', activity?.planned_end_date!);
    let sTime = useCustomTime(activity?.planned_start_date!);
    let eTime = useCustomTime(activity?.planned_end_date!);
    const [startDate, setStartDate] = useState<string>(() => {
        if (sDate) {
            return sDate;
        }
        return todayDate;
    });
    //Start Time
    const [startTime, setStartTime] = useState<string>(() => {
        if (sTime) {
            return sTime;
        }
        return todayDate;
    });
    //End Date
    const [endDate, setEndDate] = useState<string>(() => {
        if (eDate) {
            return eDate;
        }
        return todayDate;
    });
    //End Time
    const [endTime, setEndTime] = useState<string>(() => {
        if (eTime) {
            return eTime;
        }
        return todayDate;
    });

    //Tags
    const [tag, setTag] = useState<Tag>();

    const isTitleValid = useRef<Boolean>(false);
    const isDateValid = useRef<Boolean>(false);

    const [isImportant, setIsImportant] = useState<boolean>(() => {
        // if (activty) {
        //     return activty.important;
        // }
        return false;
    });

    const [isCompleted, setIsCompleted] = useState<boolean>(() => {
        if (activity) {
            return activity.status === 1 ? true : false;
        }
        return false;
    });

    const [selectedDirectory, setSelectedDirectory] = useState<number>(() => {
        if (activity) {
            return activity.task_id;
        }
        return directories[0]?.id!;
    });

    const createNewActivityHandler = (event: React.FormEvent): void => {
        event.preventDefault();

        const newActivity: ActivityCreate = {
            task_id: selectedDirectory,
            title: title,
            description: description,
            content: content,
            planned_start_date: getCustomTime(startDate, startTime),
            planned_end_date: getCustomTime(endDate, endTime),
            hours: 0,
            status: isCompleted ? 1 : 0,
            // completed: isCompleted,
            // important: isImportant,
        };
        onConfirm(newActivity);
        onClose();
    };

    const handleTagSelected = (tag: Tag) => {
        setTag(tag);
    };

    return (
        <Modal onClose={onClose} title={nameForm}>
            <form className="flex flex-col stylesInputsField" onSubmit={createNewActivityHandler}>
                <label>
                    Title
                    <input
                        type="text"
                        placeholder="e.g, study for the test"
                        required
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        className="w-full"
                    />
                </label>
                <label>
                    Description (optional)
                    <textarea
                        placeholder="e.g, study for the test"
                        className="w-full"
                        value={description}
                        onChange={({ target }) => setDescription(target.value)}
                    ></textarea>
                </label>
                <label>
                    Content
                    <textarea
                        placeholder="e.g, study for the test"
                        required
                        value={content}
                        onChange={({ target }) => setContent(target.value)}
                        className="w-full"
                    />
                </label>
                <label>
                    Start date
                    <div className="w-full">
                        <input
                            type="date"
                            className="w-9/12"
                            value={startDate}
                            required
                            onChange={({ target }) => setStartDate(target.value)}
                            min={todayDate}
                            max={maxDate}
                        />
                        <input
                            type="time"
                            className="w-3/12"
                            value={startTime}
                            required
                            onChange={({ target }) => setStartTime(target.value)}
                            min={todayDate}
                            max={maxDate}
                        />
                    </div>
                </label>
                <label>
                    End date
                    <div className="w-full">
                        <input
                            type="date"
                            className="w-9/12"
                            value={endDate}
                            required
                            onChange={({ target }) => setEndDate(target.value)}
                            min={todayDate}
                            max={maxDate}
                        />
                        <input
                            type="time"
                            className="w-3/12"
                            value={endTime}
                            required
                            onChange={({ target }) => setEndTime(target.value)}
                            min={todayDate}
                            max={maxDate}
                        />
                    </div>
                </label>

                <label>
                    Select a directory
                    <select
                        className="block w-full"
                        value={selectedDirectory}
                        onChange={({ target }) => setSelectedDirectory(parseInt(target.value))}
                    >
                        {directories.map((dir: TaskDirectory) => (
                            <option
                                key={dir.id}
                                value={dir.id}
                                className="bg-slate-100 dark:bg-slate-800"
                            >
                                {dir.title}
                            </option>
                        ))}
                    </select>
                </label>
                {/* <InputCheckbox
                    isChecked={isImportant}
                    setChecked={setIsImportant}
                    label="Mark as important"
                /> */}
                <InputCheckbox
                    isChecked={isCompleted}
                    setChecked={setIsCompleted}
                    label="Mark as completed"
                />
                <button type="submit" className="btn mt-5">
                    {nameForm}
                </button>
            </form>
        </Modal>
    );
};

export default ModalCreateTask;
