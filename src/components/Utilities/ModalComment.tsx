import React, { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import Modal from './Modal';

import { CommentCreate } from '../../model/model';
const ModalComment: React.FC<{
    onClose: () => void;
    activitiId?: number;
    onConfirm: (comment: CommentCreate) => void;
    btnText: string;
    title: string;
}> = ({ onClose, activitiId, onConfirm, btnText, title }) => {
    const [content, setContent] = useState<string>('');

    const confirmDirNameHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        const newComment: CommentCreate = {
            activity_id: activitiId!,
            task_id: null,
            content: content,
        };
        onConfirm(newComment);
        onClose();
    };

    return (
        <Modal onClose={onClose} title={title}>
            <form className="stylesInputsField">
                <div className="relative">
                    <label htmlFor="dir-name" className="">
                        Content
                    </label>
                    <textarea
                        id="dir-name"
                        placeholder="Enter a directory name"
                        value={content}
                        onChange={({ target }) => setContent(target.value)}
                        className={`inputStyles block w-full`}
                    />
                </div>
                <button className="btn mt-6" onClick={confirmDirNameHandler}>
                    {btnText}
                </button>
            </form>
        </Modal>
    );
};

export default ModalComment;
