import React, { useState } from 'react';
import '../style/Modal.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { auth } from '../Firebase'; // Ensure the Firebase initialization is correct
import { signInWithEmailAndPassword } from 'firebase/auth';
import SignUpModal from './Singup'; // Ensure this path is correct
import LandingPage from './Landing';

const Modal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showSignUp, setShowSignUp] = useState(false);

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

        if (valid) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const token = await userCredential.user.getIdToken(); // Get user token
                localStorage.setItem('authToken', token); // Save token to localStorage
                alert('User logged in successfully');
                if (typeof onLoginSuccess === 'function') {
                    onLoginSuccess(LandingPage); // Notify parent component of success
                } else {
                    console.error('onLoginSuccess is not a function');
                }
            } catch (error) {
                setEmailError('Invalid email or password');
                console.error('Login error:', error);
            }
        }
    };

    const handleSignUpClick = () => {
        setShowSignUp(true);
    };

    const handleSignUpSuccess = () => {
        setShowSignUp(false);
        if (typeof onLoginSuccess === 'function') {
            onLoginSuccess(); // Notify parent component of success
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {showSignUp ? (
                <SignUpModal isOpen={showSignUp} onClose={() => setShowSignUp(false)} onSignUpSuccess={handleSignUpSuccess} />
            ) : (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={onClose}>&times;</button>
                        <div className="login-form">
                            <div className="login-heading">
                                <h2>Login</h2>
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
                                    <a href="#">Forgot password</a>
                                </div>
                                <button type="submit">Login</button>
                            </form>
                            <p>
                                Don't have an account? <a href="#" onClick={handleSignUpClick}>Sign Up</a>
                            </p>
                            <div className="social-login">
                                <a href="/"><i className="fab fa-facebook-f"></i></a>
                                <a href="/"><i className="fab fa-google"></i></a>
                                <a href="/"><i className="fab fa-twitter"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
