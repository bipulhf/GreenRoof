import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AIAssistant from "../../AIAssistant";
import {
    faBell,
    faHouse,
    faMagnifyingGlass,
    faRightFromBracket,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import forum_logo from "/assets/forum/forum_logo.png";

export default function CommunityLeftSidebar() {
    return (
        <div className="fixed h-screen">
            <div className="">
                <Link to={"/community"}>
                    <img src={forum_logo} />
                </Link>
            </div>
            <nav className="h-[90%]">
                <ul className="h-[80%] flex flex-col text-[22px] justify-between font-medium">
                    <li>
                        <FontAwesomeIcon icon={faHouse} fontSize={22} />
                        Home
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faBell} fontSize={22} />
                        Notifications
                    </li>
                    <li>
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            fontSize={22}
                        />
                        Search
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faUser} fontSize={22} />
                        Profile
                    </li>
                    <li>
                        <AIAssistant />
                    </li>
                    <li>
                        <FontAwesomeIcon
                            icon={faRightFromBracket}
                            fontSize={22}
                            rotation={180}
                        />
                        Logout
                    </li>
                </ul>
            </nav>
        </div>
    );
}
