import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CommunityMobileHeader() {
    return (
        <div className="fixed md:hidden right-5 top-5">
            <FontAwesomeIcon
                icon={faRightFromBracket}
                fontSize={20}
                className="ml-10"
            />
        </div>
    );
}
