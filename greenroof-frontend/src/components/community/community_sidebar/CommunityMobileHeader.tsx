import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function CommunityMobileHeader() {
    return (
        <div className="absolute md:hidden right-5 top-5">
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
