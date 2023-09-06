import user_photo from "/assets/forum/user_profile_photo_68x68.png";
import badge from "/assets/forum/user_badge_16x32.png";

export default function ForumUserInfo() {
    return (
        <>
            <div className="mt-2 mb-10 grid grid-cols-3 items-center">
                <div className="col-span-2 user-card flex items-center">
                    <img
                        src={user_photo}
                        alt="User Profile Photo"
                        className="w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] md:w-[66px] md:h-[66px] rounded-full mr-2"
                    />
                    <a href="" className="username">
                        <h3 className="font-semibold text-[16px] sm:text-[18px] md:text-[20px]">
                            Karim Biswas
                        </h3>
                        <h4 className="text-[11px] sm:text-[13px] md:text-[15px] text-gray">
                            @KarimB
                        </h4>
                        <h4 className="font-medium text-[11px] sm:text-[13px] md:text-[15px] text-gray">
                            From Dhaka
                        </h4>
                    </a>
                    <img
                        src={badge}
                        alt="User Badge"
                        className="h-[32px] w-[16px] self-start ml-2"
                    />
                </div>
                <div className="answers text-center justify-self-end">
                    <h3 className="font-medium text-[16px] sm:text-[18px] md:text-[20px]">
                        20
                    </h3>
                    <h4 className="text-[11px] sm:text-[13px] md:text-[15px] text-gray">
                        Answers
                    </h4>
                </div>
            </div>
        </>
    );
}
