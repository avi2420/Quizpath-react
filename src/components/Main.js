import React, { useState } from 'react';
import Modal from './Modal';
import UserProfile from './UserProfile';  

const Main = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isUserLoggedIn, setUserLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setUserLoggedIn(true);
        setModalOpen(false);
    };

    const handleLogout = () => {
        setUserLoggedIn(false);
    };

    return (
        <div>
            {isUserLoggedIn ? (
                <UserProfile onLogout={handleLogout} />
            ) : (
                <>
                    <button onClick={() => setModalOpen(true)}>Login/Sign Up</button>
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                        onLoginSuccess={handleLoginSuccess} // Pass the function correctly
                    />
                </>
            )}
        </div>
    );
};

export default Main;
