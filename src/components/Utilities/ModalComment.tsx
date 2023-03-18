import React, { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import Modal from './Modal';

import { TaskDirectory } from '../../model/model';
const ModalComment: React.FC<{
    onClose: () => void;
    dirName?: string;
    onConfirm: (newDirName: string) => void;
    btnText: string;
    title: string;
}> = ({ onClose, dirName, onConfirm, btnText, title }) => {
    const [newComment, setNewComment] = useState<string>('');

    const confirmDirNameHandler = (e: React.MouseEvent) => {
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
                        value={newComment}
                        onChange={({ target }) => setNewComment(target.value)}
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
