import {
    faHouse,
    faBell,
    faMagnifyingGlass,
    faUser,
    faRobot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CommunityMobileMenu() {
    return (
        <div className="md:hidden bg-white fixed w-[100%] bottom-0 pb-4 divide-y divide-graybg">
            <div></div>
            <div className="pt-3 flex justify-between px-10">
                <FontAwesomeIcon icon={faHouse} fontSize={20} />
                <FontAwesomeIcon icon={faBell} fontSize={20} />
                <FontAwesomeIcon icon={faRobot} color="#347E32" fontSize={20} />
                <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={20} />
                <FontAwesomeIcon icon={faUser} fontSize={20} />
            </div>
        </div>
    );
}
