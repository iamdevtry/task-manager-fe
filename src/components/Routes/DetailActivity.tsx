import React, { useState, useEffect } from 'react';
import { Activity } from '../../model/model';
import { useParams } from 'react-router-dom';
const activityDemo: Activity = {
    id: 1,
    title: 'Activity 1',
    description: 'Description 1',
    status: 0,
    content: 'Content 1',
    created_at: new Date() + '',
    updated_at: new Date() + '',
    planned_end_date: new Date() + '',
    actual_end_date: new Date() + '',
    planned_start_date: new Date() + '',
    actual_start_date: new Date() + '',
    task_id: 1,
    hours: 1,
    comments: [
        {
            id: 1,
            content: 'Comment 1',
            activity_id: 1,
            task_id: 1,
        },
        {
            id: 2,
            content: 'Comment 2',
            activity_id: 1,
            task_id: 1,
        },
    ],
};

const DetailActivity: React.FC = () => {
    let { activityId } = useParams();
    console.log(activityId);
    const [activity, setImportantTasks] = useState<Activity[]>([]);

    // useEffect(() => {
    //     const filteredTasks: Task[] = tasks.filter((task: Task) => task.important);
    //     setImportantTasks(filteredTasks);
    // }, [activityId]);

    return (
        <>
            <div className="h-full p-8">
                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                    <div className="w-full flex flex-col ">
                        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Detail activity</h4>
                            <ul className="mt-2 text-gray-700">
                                <li className="flex border-y py-2">
                                    <span className="font-bold w-[25%] mr-5">Title:</span>
                                    <span className="text-gray-700">{activityDemo.title}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-[25%] mr-5">Description:</span>
                                    <span className="text-gray-700">
                                        {activityDemo.description}
                                    </span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-[25%] mr-5">Content:</span>
                                    <span className="text-gray-700">{activityDemo.content}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-[25%] mr-5">Created At:</span>
                                    <span className="text-gray-700">{activityDemo.created_at}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-[25%] mr-5">Updated At:</span>
                                    <span className="text-gray-700">{activityDemo.updated_at}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-[25%] mr-5">
                                        Planned Started Date:
                                    </span>
                                    <span className="text-gray-700">
                                        {activityDemo.planned_start_date}
                                    </span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-[25%] mr-5">
                                        Planned End Date:
                                    </span>
                                    <span className="text-gray-700">
                                        {activityDemo.planned_end_date}
                                    </span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-[25%] mr-5">
                                        Actual Started Date:
                                    </span>
                                    <span className="text-gray-700">
                                        {activityDemo.actual_start_date}
                                    </span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-[25%] mr-5">Actual End Date:</span>
                                    <span className="text-gray-700">
                                        {activityDemo.actual_end_date}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Comments</h4>
                            <div className="relative px-4">
                                <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                                {activityDemo.comments.map((comment) => (
                                    <div className="flex items-center w-full my-6 -ml-1.5">
                                        <div className="w-1/12 z-10">
                                            <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                                        </div>
                                        <div className="w-11/12">
                                            <p className="text-sm">{comment.content}</p>
                                            <p className="text-xs text-gray-500">3 min ago</p>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex items-center mb-4 ">
                                    <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
                                                Add a new comment
                                            </h2>
                                            <div className="w-full md:w-full px-3 mb-2 mt-2">
                                                <textarea
                                                    className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                                    name="body"
                                                    placeholder="Type Your Comment"
                                                    required
                                                ></textarea>
                                            </div>
                                            <div className="w-full md:w-full flex items-start md:w-full px-3">
                                                <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                                                    <svg
                                                        fill="none"
                                                        className="w-5 h-5 text-gray-600 mr-1"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="-mr-1">
                                                    <input
                                                        type="submit"
                                                        className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                                                        value="Post Comment"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailActivity;
