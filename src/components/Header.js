import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import LoginModal from './Modal'; // Assuming 'Modal' is your LoginModal component
import SignUpModal from './Singup'; // Adjust the path if necessary
import '../style/Header.css';
import LandingPage from './Landing';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 740);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
        setIsSignUpModalOpen(false); // Ensure the other modal is closed
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const openSignUpModal = () => {
        setIsSignUpModalOpen(true);
        setIsLoginModalOpen(false); // Ensure the other modal is closed
    };

    const closeSignUpModal = () => {
        setIsSignUpModalOpen(false);
    };

    const handleScroll = () => {
        const offset = window.scrollY;
        setScrolled(offset > 0);
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 740);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className={`navbar-toggle ${scrolled ? 'scrolled' : ''}`} onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <div className="navbar-logo">
                <img src="/Images/large.png" alt="Logo" onClick={LandingPage} />
            </div>
            {!isMobile && (
                <div className="navbar-auth">
                    <button className={`btn-login ${scrolled ? 'scrolled' : ''}`} onClick={openLoginModal}>Login</button>
                    <button className={`btn-Signup ${scrolled ? 'scrolled' : ''}`} onClick={openSignUpModal}>Sign Up</button>
                </div>
            )}
            {isOpen && (
                <div className="sidebar open">
                    <div className="sidebar-header">
                        <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={toggleSidebar} />
                    </div>
                    <NavLink exact to="/" className="sidebar-link" activeClassName="active" onClick={toggleSidebar}>
                        Home
                    </NavLink>
                    <NavLink to="/profile" className="sidebar-link" activeClassName="active" onClick={toggleSidebar}>
                        Pricing
                    </NavLink>
                    <NavLink to="/QuizCategories" className="sidebar-link" activeClassName="active" onClick={toggleSidebar}>
                        Enterprise
                    </NavLink>
                    <NavLink to="/previous-scores" className="sidebar-link" activeClassName="active" onClick={toggleSidebar}>
                        Training
                    </NavLink>
                    <NavLink to="/previous-scores" className="sidebar-link" activeClassName="active" onClick={toggleSidebar}>
                        Video Tutorials
                    </NavLink>
                    <NavLink to="/previous-scores" className="sidebar-link" activeClassName="active" onClick={toggleSidebar}>
                        Contact Us
                    </NavLink>
                    {isMobile && (
                        <>
                            <button className="sidebar-link btn-login" onClick={openLoginModal}>Login</button>
                            <button className="sidebar-link btn-Signup" onClick={openSignUpModal}>Sign Up</button>
                        </>
                    )}
                </div>
            )}
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
            <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUpModal} />
        </div>
    );
};

export default Header;
