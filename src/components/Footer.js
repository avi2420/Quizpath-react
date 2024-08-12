import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import '../style/Footer.css';  

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-social-media">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
            </div>
            <div className="footer-contact-info">
                <p>Email: avi.bloomtechnosys@gmail.com</p>
                <p>Phone:  9060252277</p>
            </div>
            <div className="footer-links">
                <a href="/about">About</a>
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/terms-of-service">Terms of Service</a>
            </div>
            <div className="footer-description">
                <p>Belive in yourself, makes everything possible.</p>
            </div>
            <div className="footer-copyright">
                <p>&copy; {new Date().getFullYear()} QuizPath. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
