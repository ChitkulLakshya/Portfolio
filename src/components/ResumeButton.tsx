import React from 'react';
import './ResumeButton.css';
import { useNavigate } from 'react-router-dom';

const ResumeButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/resume');
    };

    return (
        <div className="letter-image" onClick={handleClick} title="View Resume">
            <div className="animated-mail">
                <div className="back-fold"></div>
                <div className="letter">
                    <div className="letter-border"></div>
                    <div className="letter-title"></div>
                    <div className="letter-context"></div>
                    <div className="letter-stamp">
                        <div className="letter-stamp-inner"></div>
                    </div>
                </div>
                <div className="top-fold"></div>
                <div className="body"></div>
                <div className="left-fold"></div>
            </div>
            <div className="shadow"></div>
        </div>
    );
};

export default ResumeButton;
