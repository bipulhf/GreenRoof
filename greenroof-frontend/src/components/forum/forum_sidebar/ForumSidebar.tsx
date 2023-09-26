import { Link } from "react-router-dom";
import AIAssistantButton from "../../AIAssistantButton";
import ForumCategories from "./ForumCategories";
import ForumSearch from "./ForumSearch";
import ForumTopUsers from "./ForumTopUsers";
import useAuth from "../../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMoon,
    faRightFromBracket,
    faSun,
} from "@fortawesome/free-solid-svg-icons";
import { themeMode } from "../../../services/themeMode";

interface Props {
    menuOn: boolean;
}

export default function ForumSidebar({ menuOn }: Props) {
    const { auth } = useAuth();
    return (
        <>
            <div
                className={`ml-[40px] mt-[40px] animate-once animate-duration-200 animate-ease-linear ${
                    menuOn
                        ? `pl-10 bg-white dark:bg-darkbg min-h-screen py-5 animate-fade-left`
                        : `max-lg:hidden`
                } `}
            >
                <div className="min-[1200px]:hidden mb-[15px] w-[174px] h-[36px] rounded-[100px] border-2 border-solid border-greenbtn dark:border-darksecondary">
                    <AIAssistantButton />
                </div>
                <button
                    onClick={themeMode}
                    className="mr-5 text-[20px] flex dark:text-white font-medium w-[150px] mb-5"
                >
                    {localStorage.getItem("theme") === "dark" ? (
                        <>
                            <FontAwesomeIcon
                                icon={faSun}
                                rotation={180}
                                className="self-center"
                            />
                            <span className="ml-2">Light Mode</span>
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon
                                icon={faMoon}
                                rotation={180}
                                className="self-center"
                            />
                            <span className="ml-2">Dark Mode</span>
                        </>
                    )}
                </button>
                <div className="flex w-[269px] mb-5 font-semibold">
                    {auth.username && auth.accessToken ? (
                        <>
                            <Link
                                to={"/logout"}
                                className="bg-graybg text-brown text-2xl rounded-full p-2 mr-10 hover:underline  dark:bg-darkprimary dark:text-white"
                            >
                                <FontAwesomeIcon
                                    icon={faRightFromBracket}
                                    fontSize={17}
                                    rotation={180}
                                    className="font-medium mr-2"
                                />
                                Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to={"/login"}
                                className="bg-brown text-white text-2xl rounded-full p-2 mr-10 hover:underline  dark:bg-darkprimary dark:text-white"
                            >
                                <FontAwesomeIcon
                                    icon={faRightFromBracket}
                                    fontSize={17}
                                    className="font-medium mr-2"
                                />
                                Login
                            </Link>
                        </>
                    )}
                    <Link
                        to={"/community"}
                        className="bg-graybg text-greenttl text-2xl rounded-full p-2 hover:underline dark:bg-darkprimary dark:text-white"
                    >
                        Community
                    </Link>
                </div>
                <ForumSearch />
                <ForumCategories />
                <ForumTopUsers />
            </div>
        </>
    );
}
