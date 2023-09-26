import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBell,
    faHouse,
    faMagnifyingGlass,
    faMoon,
    faRightFromBracket,
    faRobot,
    faSun,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import forum_logo from "/assets/forum/forum_logo.svg";
import useAuth from "../../../hooks/useAuth";
import forum from "/assets/community/forum.svg";
import { themeMode } from "../../../services/themeMode";

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
                        <Link to={"/community"}>
                            <FontAwesomeIcon icon={faHouse} fontSize={20} />
                            <span className="ml-5">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/community/notifications"}>
                            <FontAwesomeIcon icon={faBell} fontSize={20} />
                            <span className="ml-5">Notifications</span>{" "}
                        </Link>
                    </li>
                    <li>
                        <Link to={"/community/search"}>
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                fontSize={20}
                            />
                            <span className="ml-5">Search</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/community/user/" + auth.username}>
                            <FontAwesomeIcon icon={faUser} fontSize={20} />
                            <span className="ml-5">Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/forum"} className="hover:underline">
                            <img
                                src={forum}
                                alt="Forum Icon"
                                className="inline pr-3"
                            />
                            Forum
                        </Link>
                    </li>
                    <li>
                        <Link to={"/AI"}>
                            <FontAwesomeIcon
                                icon={faRobot}
                                fontSize={20}
                                className="text-greenbtn dark:text-white"
                            />
                            <span className="font-medium text-greenbtn ml-5 dark:text-white">
                                AI Assistant
                            </span>
                        </Link>
                    </li>
                    {localStorage.getItem("theme") === "dark" ? (
                        <li>
                            <button onClick={themeMode}>
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
                            <button onClick={themeMode}>
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
                        <button>
                            <FontAwesomeIcon
                                icon={faRightFromBracket}
                                fontSize={20}
                                rotation={180}
                            />
                            <span className="ml-5">Logout</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
