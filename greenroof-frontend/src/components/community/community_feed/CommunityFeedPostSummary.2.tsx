import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import user_profile_photo from "/assets/forum/forum_top_user_photo_40x40.png";
import {
    faComment,
    faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

export default function CommunityFeedPostSummary() {
    const [solid, setSolid] = useState(false);

    const like = () => {
        setSolid(!solid);
    };

    return (
        <div className="py-5 px-2 grid grid-cols-10">
            <img
                src={user_profile_photo}
                alt="Profile Photo"
                className="col-span-1 ml-5 w-[40px] h-[40px]"
            />
            <div className="col-span-9">
                <div className="flex pb-1">
                    <h2 className="font-semibold text-[15px] mr-2">
                        Karim Biswas
                    </h2>
                    <h2 className="font-medium text-[13px] text-gray self-center">
                        @KarimB
                    </h2>
                </div>
                <div className="pb-2">
                    <h3 className="text-[14px] text-justify">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Explicabo eveniet unde culpa esse natus, optio dicta
                        enim quo repudiandae harum officiis itaque ipsa sapiente
                        molestias et nulla dolores ratione quis.
                    </h3>
                </div>
                <div>
                    <h3 className="text-gray text-[13px]">
                        15 September, 2023
                    </h3>
                </div>
                <div className="flex pt-3">
                    <div>
                        <FontAwesomeIcon
                            icon={solid ? fasHeart : farHeart}
                            className="hover:cursor-pointer text-[16px] text-red"
                            onClick={like}
                        />
                        <span className="font-medium text-[16px] pl-2 pr-10">
                            10
                        </span>
                    </div>
                    <div>
                        <FontAwesomeIcon
                            icon={faComment}
                            className="hover:cursor-pointer text-[16px] text-brown"
                        />
                        <span className="font-medium text-[16px] pl-2">10</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
