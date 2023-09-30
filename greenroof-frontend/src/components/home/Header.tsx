import { Link } from "react-router-dom";
import home from "/assets/community/home.svg";
import community from "/assets/community/community.svg";
import forum from "/assets/community/forum.svg";
import AIAssistantButton from "../AIAssistantButton";

export default function Header() {
    return (
        <header className="relative z-10">
            <nav className="flex justify-between self-center">
                <ul className="w-[60%] flex justify-evenly text-[20px] font-medium text-black">
                    <Link
                        to={"/"}
                        className="text-white border-2 border-blue bg-blue rounded-full px-3 py-1"
                    >
                        <img
                            src={home}
                            alt="Home Icon"
                            className="inline pr-3"
                        />
                        Home
                    </Link>
                    <Link to={"/community"} className="hover:underline">
                        <img
                            src={community}
                            alt="Community Icon"
                            className="inline pr-3"
                        />
                        Community
                    </Link>
                    <Link to={"/forum"} className="hover:underline">
                        <img
                            src={forum}
                            alt="Forum Icon"
                            className="inline pr-3"
                        />
                        Forum
                    </Link>
                </ul>
                <ul className="border-2 border-greenttl rounded-full pr-3 py-1">
                    <a href="https://greenroof-ai-assistant.vercel.app">
                        <AIAssistantButton />
                    </a>
                </ul>
            </nav>
        </header>
    );
}
