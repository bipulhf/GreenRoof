import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ForumSidebar from "./ForumSidebar";

export default function ForumMobileMenu() {
    const [menuOn, setmenuOn] = useState(false);
    return (
        <>
            <div className="absolute right-0 top-10 md:top-16 lg:hidden mb-nav justify-items-end cursor-pointer">
                <span className={`absolute top-0 right-0`}>
                    <FontAwesomeIcon
                        icon={faBars}
                        fontSize={25}
                        color="#1E670B"
                        onClick={() => setmenuOn(!menuOn)}
                    />
                </span>
                <ForumSidebar menuOn={menuOn} />
            </div>
        </>
    );
}
