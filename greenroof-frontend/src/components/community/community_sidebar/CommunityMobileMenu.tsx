import {
    faHouse,
    faBell,
    faMagnifyingGlass,
    faUser,
    faRobot,
    faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function CommunityMobileMenu() {
    const { auth } = useAuth();
    return (
        <div className="md:hidden bg-white fixed w-[100%] bottom-0 z-10 pb-4 divide-y divide-graybg dark:divide-opacity-25 dark:bg-darkbg">
            <div></div>
            <div className="pt-3 flex justify-between px-10 dark:text-white">
                <Link to={"/community"}>
                    <FontAwesomeIcon icon={faHouse} fontSize={20} />
                </Link>
                <Link to={"/community/notifications"}>
                    <FontAwesomeIcon icon={faBell} fontSize={20} />
                </Link>
                <Link to={"/community/messages"} className="hover:underline">
                    <FontAwesomeIcon icon={faMessage} fontSize={20} />
                </Link>
                <a href="https://greenroof-ai-assistant.vercel.app">
                    <FontAwesomeIcon
                        icon={faRobot}
                        fontSize={20}
                        className="text-greenbtn dark:text-white"
                    />{" "}
                </a>
                <Link to={"/community/search"}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={20} />
                </Link>
                <Link to={"/community/user/" + auth.username}>
                    <FontAwesomeIcon icon={faUser} fontSize={20} />
                </Link>
            </div>
        </div>
    );
}
