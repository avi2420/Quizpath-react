import React, { useState } from 'react';
import '../style/Modal.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { auth } from '../Firebase'; // Ensure the Firebase initialization is correct
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpModal = ({ isOpen, onClose, onSignUpSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        let valid = true;
        const emailPattern = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!emailPattern.test(email)) {
            setEmailError('Invalid email address');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!passwordPattern.test(password)) {
            setPasswordError('Invalid password. Must contain uppercase, lowercase, numbers, and special character.');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            valid = false;
        } else {
            setConfirmPasswordError('');
        }

        if (valid) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const token = await userCredential.user.getIdToken(); // Get user token
                localStorage.setItem('authToken', token); // Save token to localStorage
                setMessage('User created successfully');
                onSignUpSuccess(); // Close the modal on successful signup
            } catch (error) {
                setMessage(error.message || 'An unexpected error occurred');
                console.error(error);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <div className="login-form">
                    <div className="login-heading">
                        <h2>Sign Up</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {emailError && <p className="error">{emailError}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {passwordError && <p className="error">{passwordError}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
                        </div>
                        <button type="submit">Sign Up</button>
                        {message && <p className="message">{message}</p>}
                    </form>
                    <p>
                        Already have an account? <a href="#" onClick={onClose}>Login</a>
                    </p>
                    <div className="social-login">
                        <a href="/"><i className="fab fa-facebook-f"></i></a>
                        <a href="/"><i className="fab fa-google"></i></a>
                        <a href="/"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpModal;
