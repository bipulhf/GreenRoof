import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ForumMobileMenu() {
    return (
        <>
            <div className="lg:hidden mb-nav ml-5 justify-items-end cursor-pointer">
                <FontAwesomeIcon icon={faBars} fontSize={25} color="#1E670B" />
            </div>
        </>
    );
}
