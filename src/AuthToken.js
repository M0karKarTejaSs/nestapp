export const retToken = () => {
    const token = localStorage.getItem("AuthToken");
    return `Bearer ${atob(token)}`;
}