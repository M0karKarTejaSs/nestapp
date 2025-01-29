import React, { useState } from "react";
import '../styles/ForgotPasswordModal.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false); // New state for toggling password visibility

    const toggleModal = () => setIsModalOpen(prev => !prev);
    const handleChange = setter => e => setter(e.target.value);

    const showToast = (message, type) => {
        toast[type](message, { position: "top-center", autoClose: 3000 });
    };

    const handleApiRequest = async (action, body) => {
        try {
            const res = await fetch("http://localhost:8080/api/pwd", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, ...body }),
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data, "err");   

                throw new Error(  data.error ?? 'Request failed');
            }
            return data;
        } catch (error) {
            showToast(error.message || 'Something went wrong', 'error');
            throw error;
        }
    };

    const genOtp = async () => {
        try {
            await handleApiRequest('GENERATE_OTP', { email });
            setStep(2);
            showToast("OTP sent to your email!", 'success');
        } catch (error) {
            console.error("Error generating OTP:", error);
        }
    };

    const authOtp = async () => {
        if (newPassword !== confirmPassword) {
            showToast("Passwords do not match", 'error');
            return;
        }
        try {
            const data = await handleApiRequest('VALIDATE_OTP', { email, otp, newPassword });
            if (data.message === 'Password updated successfully') {
                showToast("Password reset successfully", 'success');
                toggleModal();
            }
        } catch (error) {
            console.error("Error validating OTP:", error);
        }
    };

    return (
        <div>
            <button type="button" className="fg-btn" onClick={toggleModal}>
                Forgot Password?
            </button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modalContent">
                        <div className="modalHeader">
                            <button className="close" onClick={toggleModal}>×</button>
                            <h1>Reset Your Password</h1>
                        </div>
                        <form className="modalBody" onSubmit={e => e.preventDefault()}>
                            {step === 1 ? (
                                <>
                                    <input
                                        className="input"
                                        placeholder="E-mail Address"
                                        type="email"
                                        value={email}
                                        onChange={handleChange(setEmail)}
                                        required
                                    />
                                    <button className="submitBtn" type="button" onClick={genOtp}>
                                        Send OTP
                                    </button>
                                </>
                            ) : (
                                <>
                                    <input
                                        className="input"
                                        placeholder="E-mail Address"
                                        type="email"
                                        value={email}
                                        disabled
                                    />
                                    <input
                                        className="input"
                                        placeholder="Enter OTP"
                                        type="text"
                                        value={otp}
                                        onChange={handleChange(setOtp)}
                                        required
                                    />
                                    <input
                                        className="input"
                                        placeholder="New Password"
                                        type={showPassword ? "text" : "password"} // Toggle password visibility
                                        value={newPassword}
                                        onChange={handleChange(setNewPassword)}
                                        required
                                    />
                                    <input
                                        className="input"
                                        placeholder="Confirm Password"
                                        type={showPassword ? "text" : "password"} // Toggle password visibility
                                        value={confirmPassword}
                                        onChange={handleChange(setConfirmPassword)}
                                        required
                                    />
                                    <div className="showPasswordContainer">
                                        <input
                                            type="checkbox"
                                            id="showPassword"
                                            checked={showPassword}
                                            onChange={() => setShowPassword(!showPassword)}
                                        />
                                        <label htmlFor="showPassword">Show Password</label>
                                    </div>
                                    <button className="submitBtn" type="button" onClick={authOtp}>
                                        Reset Password
                                    </button>
                                </>
                            )}
                        </form>
                        <div className="modalFooter">
                            <button className="cancelBtn" onClick={toggleModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default ForgotPasswordModal;
