import { RouterProvider } from "react-router-dom";
import router from "./routing/routes";

const App = () => {
    if (localStorage.theme === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
    return (
        <div className="dark:bg-darkbg">
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
