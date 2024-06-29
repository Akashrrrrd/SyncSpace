import React from 'react';
import './Modal.css';

const Modal = ({ title, onClose, children }) => (
    <div className="modal-overlay">
        <div className="modal">
            <div className="modal-header">
                <h2>{title}</h2>
                <button className="close-button" onClick={onClose}>&times;</button>
            </div>
            <div className="modal-body">
                {children}
            </div>
        </div>
    </div>
);

export default Modal;
