import React, { useRef, useState } from 'react';
import { Task } from '../../interfaces';
import { useAppSelector } from '../../store/hooks';
import Modal from './Modal';

import { ActivityCreate } from '../../model/model';
import { getCustomTime } from '../../utils/CustomTime';
import AutoComplete from '../Utilities/AutoComplete';

import { Activity, Tag } from '../../model/model';
const items: Tag[] = [
    {
        id: 0,
        name: 'Cobol',
        slug: 'cobol',
    },
    {
        id: 1,
        name: 'JavaScript',
        slug: 'javascript',
    },
    {
        id: 2,
        name: 'Basic',
        slug: 'basic',
    },
    {
        id: 3,
        name: 'PHP',
        slug: 'php',
    },
    {
        id: 4,
        name: 'Java',
        slug: 'java',
    },
];

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
    const [startDate, setStartDate] = useState<string>('');
    //Start Time
    const [startTime, setStartTime] = useState<string>('');
    //End Date
    const [endDate, setEndDate] = useState<string>('');
    //End Time
    const [endTime, setEndTime] = useState<string>('');

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
        // if (activty) {
        //     return activty.completed;
        // }
        return false;
    });

    // const [selectedDirectory, setSelectedDirectory] = useState<string>(() => {
    //     if (task) {
    //         return task.dir;
    //     }
    //     return directories[0];
    // });

    const createNewActivityHandler = (event: React.FormEvent): void => {
        event.preventDefault();
        // console.log('add new activity');
        // isTitleValid.current = title.trim().length > 0;
        // isDateValid.current = date.trim().length > 0;

        // if (isTitleValid.current && isDateValid.current) {
        //     const newActivity: ActivityCreate = {
        //         task_id: 1,
        //         title: title,
        //         description: description,
        //         content: content,
        //         planned_start_date: handleDateTime(startDate, startTime),
        //         planned_end_date: handleDateTime(endDate, endTime),
        //         hours: 0,
        //         status: 0,
        //         // completed: isCompleted,
        //         // important: isImportant,
        //     };
        //     onConfirm(newActivity);
        //     onClose();
        // }

        const newActivity: ActivityCreate = {
            task_id: 1,
            title: title,
            description: description,
            content: content,
            planned_start_date: getCustomTime(startDate, startTime),
            planned_end_date: getCustomTime(endDate, endTime),
            hours: 0,
            status: 0,
            tag: tag!,
            // completed: isCompleted,
            // important: isImportant,
        };
        onConfirm(newActivity);
        onClose();
    };

    const handleTagSelected = (tag: Tag) => {
        console.log(tag);
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
                        // value={selectedDirectory}
                        // onChange={({ target }) => setSelectedDirectory(target.value)}
                    >
                        {/* {directories.map((dir: string) => (
              <option
                key={dir}
                value={dir}
                className="bg-slate-100 dark:bg-slate-800"
              >
                {dir}
              </option>
            ))} */}
                    </select>
                </label>
                <label>
                    Tags
                    <AutoComplete tags={items} onConfirm={handleTagSelected} />
                </label>
                <InputCheckbox
                    isChecked={isImportant}
                    setChecked={setIsImportant}
                    label="Mark as important"
                />
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
