import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBell,
    faHouse,
    faMagnifyingGlass,
    faMessage,
    faMoon,
    faRightFromBracket,
    faRobot,
    faSun,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import forum_logo from "/assets/forum/forum_logo.svg";
import { themeMode } from "../../../services/themeMode";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import useAuth from "../../../hooks/useAuth";
export default function CommunityLeftSidebar() {
    const { auth } = useAuth();

    return (
        <div className="fixed h-screen max-md:hidden md:w-[30%] min-[1000px]:w-[20%]">
            <div className="">
                <Link to={"/community"}>
                    <img src={forum_logo} />
                </Link>
            </div>
            <nav className="h-[90%]">
                <ul className="h-[80%] flex flex-col text-[17px] lg:text-[18px] justify-between font-medium p-[10%] ml-[5%] min-[1250px]:ml-[20%] dark:text-white">
                    <li>
                        <Link to={"/community"} className="hover:underline">
                            <FontAwesomeIcon icon={faHouse} fontSize={20} />
                            <span className="ml-5">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/community/notifications"}
                            className="hover:underline"
                        >
                            <FontAwesomeIcon icon={faBell} fontSize={20} />
                            <span className="ml-5">Notifications</span>{" "}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/community/messages"}
                            className="hover:underline"
                        >
                            <FontAwesomeIcon icon={faMessage} fontSize={20} />
                            <span className="ml-5">Messages</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/community/search"}
                            className="hover:underline"
                        >
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                fontSize={20}
                            />
                            <span className="ml-5">Search</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/community/user/" + auth.username}
                            className="hover:underline"
                        >
                            <FontAwesomeIcon icon={faUser} fontSize={20} />
                            <span className="ml-5">Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/forum"} className="hover:underline">
                            <FontAwesomeIcon
                                icon={faCircleQuestion}
                                fontSize={20}
                            />
                            <span className="ml-5">Forum</span>
                        </Link>
                    </li>
                    <li>
                        <a
                            href="https://greenroof-ai-assistant.vercel.app"
                            className="hover:underline"
                        >
                            <FontAwesomeIcon
                                icon={faRobot}
                                fontSize={20}
                                className="text-greenbtn dark:text-white"
                            />
                            <span className="font-medium text-greenbtn ml-5 dark:text-white">
                                AI Assistant
                            </span>
                        </a>
                    </li>
                    {localStorage.getItem("theme") === "dark" ? (
                        <li>
                            <button
                                onClick={themeMode}
                                className="hover:underline"
                            >
                                <FontAwesomeIcon
                                    icon={faSun}
                                    fontSize={20}
                                    rotation={180}
                                />
                                <span className="ml-5">Light Mode</span>
                            </button>
                        </li>
                    ) : (
                        <li>
                            <button
                                onClick={themeMode}
                                className="hover:underline"
                            >
                                <FontAwesomeIcon
                                    icon={faMoon}
                                    fontSize={20}
                                    rotation={180}
                                />
                                <span className="ml-5">Dark Mode</span>
                            </button>
                        </li>
                    )}
                    <li>
                        <Link to={"/logout"} className="hover:underline">
                            <FontAwesomeIcon
                                icon={faRightFromBracket}
                                fontSize={20}
                                rotation={180}
                            />
                            <span className="ml-5">Logout</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
