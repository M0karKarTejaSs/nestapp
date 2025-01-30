import React, { useState } from "react";
import "../styles/ForgotPasswordModal.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPasswordModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleModal = () => setIsModalOpen(prev => !prev);
    const handleChange = setter => e => setter(e.target.value);

    const showToast = (message, type) => {
        toast[type](message, { position: "top-center", autoClose: 3000 });
    };

    const handleApiRequest = async (action, body) => {
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:8080/api/pwd", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, ...body }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || 'Request failed');
            }
            return data;
        } catch (error) {
            showToast(error.message || 'Something went wrong', 'error');
            throw error;
        } finally {
            setIsLoading(false);
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
            <button type="button" className="fg-btn" onClick={toggleModal} disabled={isLoading}>
                Forgot Password?
            </button>

            {isModalOpen && (
                <div className="modal">
                    <div className={`modalContent ${isLoading ? 'loading' : ''}`}>
                        <div className="modalHeader">
                            <button className="close" onClick={toggleModal}>×</button>
                            <h1>Reset Your Password</h1>
                        </div>
                        <form className="modalBody" onSubmit={e => e.preventDefault()}>
                            {isLoading && (
                                <div className="loader-container">
                                    <div className="loader"></div>
                                </div>
                            )}
                            {step === 1 ? (
                                <>
                                    <input
                                        className="input"
                                        placeholder="E-mail Address"
                                        type="email"
                                        value={email}
                                        onChange={handleChange(setEmail)}
                                        required
                                        disabled={isLoading}
                                    />
                                    <button
                                        className="submitBtn"
                                        type="button"
                                        onClick={genOtp}
                                        disabled={isLoading}
                                    >
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
                                        disabled={isLoading}
                                    />
                                    <input
                                        className="input"
                                        placeholder="New Password"
                                        type={showPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={handleChange(setNewPassword)}
                                        required
                                        disabled={isLoading}
                                    />
                                    <input
                                        className="input"
                                        placeholder="Confirm Password"
                                        type={showPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={handleChange(setConfirmPassword)}
                                        required
                                        disabled={isLoading}
                                    />
                                    <div className="showPasswordContainer">
                                        <input
                                            type="checkbox"
                                            id="showPassword"
                                            checked={showPassword}
                                            onChange={() => setShowPassword(!showPassword)}
                                            disabled={isLoading}
                                        />
                                        <label htmlFor="showPassword">Show Password</label>
                                    </div>
                                    <button
                                        className="submitBtn"
                                        type="button"
                                        onClick={authOtp}
                                        disabled={isLoading}
                                    >
                                        Reset Password
                                    </button>
                                </>
                            )}
                        </form>
                        <div className="modalFooter">
                            <button className="cancelBtn" onClick={toggleModal} disabled={isLoading}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* <ToastContainer /> */}
        </div>
    );
};

export default ForgotPasswordModal;
