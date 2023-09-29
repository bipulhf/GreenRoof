import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex justify-center min-w-full min-h-screen">
            <div className="self-center text-center">
                <h1 className="text-9xl">404</h1>
                <h2 className="text-5xl">WE ARE SORRY, PAGE NOT FOUND!</h2>
                <div className="mt-10 text-xl">
                    <Link to={"/community"} className="hover:underline mr-10">
                        Community Page
                    </Link>
                    <Link to={"/forum"} className="hover:underline">
                        Forum Page
                    </Link>
                </div>
            </div>
        </div>
    );
}
