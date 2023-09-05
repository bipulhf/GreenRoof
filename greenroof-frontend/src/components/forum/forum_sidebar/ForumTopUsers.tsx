import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import user_profile_photo from "/assets/forum/forum_top_user_photo_40x40.png";

export default function ForumTopUsers() {
    return (
        <>
            <div className="search-title w-[269px] bg-graybg rounded-[27px] px-[18px] py-[12px] mb-[15px]">
                <div className="mb-[12px]">
                    <span className="mr-[21px]">
                        <FontAwesomeIcon icon={faUser} fontSize={20} />
                    </span>
                    <span className="text-[20px] font-medium">Top Users</span>
                </div>
                <ol>
                    <li className="flex mb-[10px]">
                        <img
                            src={user_profile_photo}
                            alt="User Photo"
                            className="w-[40px] h-[40px] rounded-full mt-[10px] mr-[12px]"
                        />
                        <div>
                            <h3 className="font-semibold text-[16px]">
                                Karim Biswas
                            </h3>
                            <h4 className="font-medium text-[14px] text-gray">
                                @KarimB
                            </h4>
                            <h4 className="font-semibold text-gray text-[14px]">
                                20 Answers
                            </h4>
                        </div>
                    </li>
                    <li className="flex mb-[10px]">
                        <img
                            src={user_profile_photo}
                            alt="User Photo"
                            className="w-[40px] h-[40px] rounded-full mt-[10px] mr-[12px]"
                        />
                        <div>
                            <h3 className="font-semibold text-[16px]">
                                Karim Biswas
                            </h3>
                            <h4 className="font-medium text-[14px] text-gray">
                                @KarimB
                            </h4>
                            <h4 className="font-semibold text-gray text-[14px]">
                                20 Answers
                            </h4>
                        </div>
                    </li>
                    <li className="flex mb-[10px]">
                        <img
                            src={user_profile_photo}
                            alt="User Photo"
                            className="w-[40px] h-[40px] rounded-full mt-[10px] mr-[12px]"
                        />
                        <div>
                            <h3 className="font-semibold text-[16px]">
                                Karim Biswas
                            </h3>
                            <h4 className="font-medium text-[14px] text-gray">
                                @KarimB
                            </h4>
                            <h4 className="font-semibold text-gray text-[14px]">
                                20 Answers
                            </h4>
                        </div>
                    </li>
                    <li className="flex mb-[10px]">
                        <img
                            src={user_profile_photo}
                            alt="User Photo"
                            className="w-[40px] h-[40px] rounded-full mt-[10px] mr-[12px]"
                        />
                        <div>
                            <h3 className="font-semibold text-[16px]">
                                Karim Biswas
                            </h3>
                            <h4 className="font-medium text-[14px] text-gray">
                                @KarimB
                            </h4>
                            <h4 className="font-semibold text-gray text-[14px]">
                                20 Answers
                            </h4>
                        </div>
                    </li>
                </ol>
            </div>
        </>
    );
}
