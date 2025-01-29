import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("AuthToken");
export const retToken = () => {
    if (!token || typeof token !== 'string') {
        console.error('Token is missing or invalid!');
        return;
    }
    return `Bearer ${atob(token)}`;
}
export const getUserIdFromToken = () => token ? jwtDecode(token).userId : "";