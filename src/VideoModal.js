import React from 'react';
import './Modal.css';

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
    if (!isOpen) return null;

    return (
        <div className="video-modal-overlay">
            <div className="video-modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <video controls>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default VideoModal;