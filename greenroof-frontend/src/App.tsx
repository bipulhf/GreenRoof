import { RouterProvider } from "react-router-dom";
import router from "./routing/routes";

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
