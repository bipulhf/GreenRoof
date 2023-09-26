import {
    faMoon,
    faRightFromBracket,
    faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { themeMode } from "../../../services/themeMode";

export default function CommunityMobileHeader() {
    return (
        <div className="absolute md:hidden right-5 top-5 dark:text-white">
            {localStorage.getItem("theme") === "dark" ? (
                <button onClick={themeMode}>
                    <FontAwesomeIcon
                        icon={faSun}
                        fontSize={20}
                        rotation={180}
                    />
                </button>
            ) : (
                <button onClick={themeMode}>
                    <FontAwesomeIcon
                        icon={faMoon}
                        fontSize={20}
                        rotation={180}
                    />
                </button>
            )}
            <Link to={"/logout"}>
                <FontAwesomeIcon
                    icon={faRightFromBracket}
                    fontSize={20}
                    className="ml-10"
                />
            </Link>
        </div>
    );
}
