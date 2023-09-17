import { Link } from "react-router-dom";
import Background from "../components/home/Background";
import Header from "../components/home/Header";
import Home from "../components/home/Home";
import forum_logo from "/assets/forum/forum_logo.svg";

export default function MainPage() {
    return (
        <div className="bg-gradient-to-b from-bluebg to-greenbg min-h-screen relative">
            <div className="flex min-w-[100%]">
                <Link to={"/"}>
                    <img src={forum_logo} />
                </Link>
                <span className="max-[950px]:hidden self-center w-[85%]">
                    <Header />
                </span>
            </div>
            <Home />
            <Background />
        </div>
    );
}
