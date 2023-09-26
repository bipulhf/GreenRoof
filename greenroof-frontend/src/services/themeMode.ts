export const themeMode = () => {
    if (localStorage.theme === "dark") localStorage.removeItem("theme");
    else localStorage.theme = "dark";
    window.location.reload();
};
