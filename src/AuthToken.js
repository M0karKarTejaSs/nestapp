import { jwtDecode } from "jwt-decode";

export const retToken = () => {
    try {
        const token = localStorage.getItem("AuthToken");
        if (!token || typeof token !== "string") throw new Error("Invalid or missing token");
        return `Bearer ${atob(token)}`;
    } catch (error) {
        console.error("Error retrieving token:", error.message);
        return null;
    }
};

export const getUserIdFromToken = () => {
    try {
        const token = localStorage.getItem("AuthToken");
        if (!token || typeof token !== "string") throw new Error("Invalid or missing token");
        const decoded = jwtDecode(token);
        return decoded?.userId || null;
    } catch (error) {
        console.error("Error decoding token:", error.message);
        return null;
    }
};
