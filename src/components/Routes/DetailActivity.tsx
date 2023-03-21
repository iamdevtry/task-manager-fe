import React, { useState, useEffect } from 'react';
import { Activity, Comment } from '../../model/model';
import { useParams } from 'react-router-dom';
import taskManagerApi from '../../api/taskManagerApi';

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

    const [activity, setActivity] = useState<Activity>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [contentNewComment, setContentNewComment] = useState<string>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        const getDetailActivity = async () => {
            const response = await taskManagerApi.getActivity(parseInt(activityId!));
            setActivity(response.data);
        };
        const getCommentsByActivityId = async () => {
            const response = await taskManagerApi.getListCommentsByActivityId(
                parseInt(activityId!)
            );
            setComments(response.data);
        };
        if (activityId) {
            getDetailActivity();
            getCommentsByActivityId();
        }
    }, [activityId]);

    const addComment = () => {
        const newComment: Comment = {
            title: 'Comment',
            content: contentNewComment!,
            activity_id: parseInt(activityId!),
        };

        taskManagerApi
            .addComment(newComment)
            .then((res) => {
                console.log(res);
                setComments([...comments, res.data]);
            })
            .catch((error) => {
                setError(error.response.data.message);
            });
    };

    const handleAddComment = () => {
        if (contentNewComment && contentNewComment.length > 0) {
            addComment();
            setContentNewComment('');
            setError('');
        } else {
            setError('Content is required');
        }
    };

    const deleteComment = (commentId: number) => {
        taskManagerApi.deleteComment(commentId).then((res) => {
            setComments(comments.filter((comment) => comment.id !== commentId));
        });
    };

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
                                    <span className="text-gray-700">{activity?.title}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-[25%] mr-5">Description:</span>
                                    <span className="text-gray-700">{activity?.description}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-[25%] mr-5">Content:</span>
                                    <span className="text-gray-700">{activity?.content}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-[25%] mr-5">Created At:</span>
                                    <span className="text-gray-700">{activity?.created_at}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-[25%] mr-5">Updated At:</span>
                                    <span className="text-gray-700">{activity?.updated_at}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-[25%] mr-5">
                                        Planned Started Date:
                                    </span>
                                    <span className="text-gray-700">
                                        {activity?.planned_start_date}
                                    </span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-[25%] mr-5">
                                        Planned End Date:
                                    </span>
                                    <span className="text-gray-700">
                                        {activity?.planned_end_date}
                                    </span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-[25%] mr-5">
                                        Actual Started Date:
                                    </span>
                                    <span className="text-gray-700">
                                        {activity?.actual_start_date}
                                    </span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-[25%] mr-5">Actual End Date:</span>
                                    <span className="text-gray-700">
                                        {activity?.actual_end_date}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Comments</h4>
                            <div className="relative px-4">
                                <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                                {comments?.map((comment, i) => (
                                    <div key={i} className="flex items-center w-full my-6 -ml-1.5">
                                        <div className="w-1/12 z-10">
                                            <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                                        </div>
                                        <div className="w-11/12">
                                            <p className="text-sm">{comment.content}</p>
                                            <p className="text-xs text-gray-500">3 min ago</p>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-5 z-10">
                                                <svg
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="1.5"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    aria-hidden="true"
                                                    cursor="pointer"
                                                    className="hover:text-sky-500"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <div className="w-5 z-10">
                                                <svg
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="1.5"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    aria-hidden="true"
                                                    cursor="pointer"
                                                    className="hover:text-rose-700"
                                                    onClick={() => deleteComment(comment.id!)}
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex items-center mb-4 ">
                                    <div className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
                                                Add a new comment
                                            </h2>
                                            <div className="w-full md:w-full px-3 mb-2 mt-2">
                                                {error && (
                                                    <div className="text-rose-600">* {error}</div>
                                                )}
                                                <textarea
                                                    className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                                    name="body"
                                                    placeholder="Type Your Comment"
                                                    required
                                                    value={contentNewComment}
                                                    onChange={(e) =>
                                                        setContentNewComment(e.target.value)
                                                    }
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
                                                    <button
                                                        onClick={handleAddComment}
                                                        className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                                                    >
                                                        Add Comment
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
