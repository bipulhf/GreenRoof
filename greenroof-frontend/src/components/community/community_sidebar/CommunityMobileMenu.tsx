import {
    faHouse,
    faBell,
    faMagnifyingGlass,
    faUser,
    faRobot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function CommunityMobileMenu() {
    const { auth } = useAuth();
    return (
        <div className="md:hidden bg-white fixed w-[100%] bottom-0 pb-4 divide-y divide-graybg">
            <div></div>
            <div className="pt-3 flex justify-between px-10">
                <Link to={"/community"}>
                    <FontAwesomeIcon icon={faHouse} fontSize={20} />
                </Link>
                <Link to={"/notification"}>
                    <FontAwesomeIcon icon={faBell} fontSize={20} />
                </Link>
                <Link to={"/AI"}>
                    <FontAwesomeIcon
                        icon={faRobot}
                        color="#347E32"
                        fontSize={20}
                    />{" "}
                </Link>
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
