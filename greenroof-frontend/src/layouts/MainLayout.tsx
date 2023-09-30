import { Link, Outlet } from "react-router-dom";
import Background from "../components/home/Background";
import Header from "../components/home/Header";
import forum_logo from "/assets/forum/forum_logo.svg";

export default function MainLayout() {
    return (
        <div className="bg-gradient-to-b from-bluebg to-greenbg min-h-screen relative">
            <div className="flex min-w-[100%]">
                <Link to={"/"}>
                    <img src={forum_logo} className="relative z-10" />
                </Link>
                <span className="max-[950px]:hidden self-center w-[85%]">
                    <Header />
                </span>
            </div>
            <Outlet />
            <Background />
        </div>
    );
}
