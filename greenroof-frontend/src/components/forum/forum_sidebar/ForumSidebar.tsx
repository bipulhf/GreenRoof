import { Link } from "react-router-dom";
import AIAssistant from "../../AIAssistant";
import ForumCategories from "./ForumCategories";
import ForumSearch from "./ForumSearch";
import ForumTopUsers from "./ForumTopUsers";
import useAuth from "../../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

interface Props {
    menuOn: boolean;
}

export default function ForumSidebar({ menuOn }: Props) {
    const { auth } = useAuth();
    return (
        <>
            <div
                className={`ml-[40px] mt-[40px] ${
                    menuOn
                        ? `pl-[620px] bg-white min-h-screen py-5 w-[900px] bg-opacity-80`
                        : `max-lg:hidden`
                } `}
            >
                <div className="min-[1200px]:hidden mb-[15px] w-[174px] h-[36px] rounded-[100px] border-2 border-solid border-greenbtn">
                    <AIAssistant />
                </div>
                <div className="flex w-[269px] mb-5 font-semibold">
                    {auth.username && auth.accessToken ? (
                        <>
                            <Link
                                to={"/logout"}
                                className="bg-graybg text-brown text-2xl rounded-full p-2 mr-10 hover:underline"
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
                                className="bg-brown text-white text-2xl rounded-full p-2 mr-10 hover:underline"
                            >
                                <FontAwesomeIcon
                                    icon={faRightFromBracket}
                                    fontSize={17}
                                    rotation={180}
                                    className="font-medium mr-2"
                                />
                                Login
                            </Link>
                        </>
                    )}
                    <Link
                        to={"/community"}
                        className="bg-graybg text-greenttl text-2xl rounded-full p-2 hover:underline"
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
