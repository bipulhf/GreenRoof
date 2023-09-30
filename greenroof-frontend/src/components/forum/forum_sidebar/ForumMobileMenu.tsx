import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ForumSidebar from "./ForumSidebar";

export default function ForumMobileMenu() {
    const [menuOn, setmenuOn] = useState(false);
    return (
        <>
            <div className="absolute right-0 top-10 md:top-16 lg:hidden mb-nav justify-items-end cursor-pointer dark:text-white text-[20px]">
                <span className={`absolute top-0 right-0 z-10`}>
                    <FontAwesomeIcon
                        icon={faBars}
                        onClick={() => setmenuOn(!menuOn)}
                        className="text-greenbtn dark:text-white"
                    />
                </span>
                <ForumSidebar menuOn={menuOn} />
            </div>
        </>
    );
}
