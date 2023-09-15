import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBell,
    faHouse,
    faMagnifyingGlass,
    faRightFromBracket,
    faRobot,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import forum_logo from "/assets/forum/forum_logo.svg";

export default function CommunityLeftSidebar() {
    return (
        <div className="fixed h-screen w-[20%]">
            <div className="">
                <Link to={"/community"}>
                    <img src={forum_logo} />
                </Link>
            </div>
            <nav className="h-[90%]">
                <ul className="h-[80%] flex flex-col text-[17px] lg:text-[18px] justify-between font-medium p-[10%] ml-[5%] min-[1250px]:ml-[20%]">
                    <li>
                        <FontAwesomeIcon icon={faHouse} fontSize={20} />
                        <span className="ml-5">Home</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faBell} fontSize={20} />
                        <span className="ml-5">Notifications</span>
                    </li>
                    <li>
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            fontSize={20}
                        />
                        <span className="ml-5">Search</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faUser} fontSize={20} />{" "}
                        <span className="ml-5">Profile</span>
                    </li>
                    <li>
                        <FontAwesomeIcon
                            icon={faRobot}
                            color="#347E32"
                            fontSize={20}
                        />
                        <span className="font-medium text-greenbtn ml-5">
                            AI Assistant
                        </span>
                    </li>
                    <li>
                        <FontAwesomeIcon
                            icon={faRightFromBracket}
                            fontSize={20}
                            rotation={180}
                        />
                        <span className="ml-5">Logout</span>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
