import React, { PropsWithChildren } from 'react';
import './modal.css';

interface Props {
    onClose?: () => void;
    title: string;
}

const Modal = ({ children, onClose, title }: PropsWithChildren<Props>) => {
    return <>
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="modal">
            <div className='modal-wrapper'>
                <h3 className="modal-title">{title}</h3>
                <button className="modal-close-button" onClick={onClose} aria-label="Close">&times;</button>
                {children}
            </div>
        </div>
    </>;
}

export default Modal;