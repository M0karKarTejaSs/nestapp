const logoutUser = () => {
    localStorage.removeItem("authToken");
    window.location.replace("/");
    localStorage.clear("AuthToken");
    alert("Session expired. You have been logged out due to inactivity.");
};

export default logoutUser;
