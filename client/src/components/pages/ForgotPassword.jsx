import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../index.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        // Placeholder logic for future implementation
        setMessage(`If an account exists for ${email}, a reset link has been sent.`);
        setEmail("");
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Forgot Password</h2>
                {message && <div className="auth-error" style={{ borderColor: 'green', backgroundColor: 'rgba(0, 255, 0, 0.1)', color: '#fff' }}>{message}</div>}
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="auth-input"
                        />
                    </div>
                    <button type="submit" className="auth-btn">
                        Send Reset Link
                    </button>
                </form>

                <div className="auth-link">
                    <p>Remembered your password? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
