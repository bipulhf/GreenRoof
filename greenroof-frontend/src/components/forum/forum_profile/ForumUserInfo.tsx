import user_photo from "/assets/forum/user_profile_photo_104x104.png";
import badge from "/assets/forum/user_badge_16x32.png";

export default function ForumUserInfo() {
    return (
        <>
            <div className="mt-2 mb-10 user-card flex flex-col justify-center items-center">
                <img
                    src={user_photo}
                    alt="User Profile Photo"
                    className="w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] md:w-[104px] md:h-[104px] rounded-full mr-2"
                />
                <a href="" className="username text-center">
                    <h3 className="inline font-semibold text-[16px] sm:text-[18px] md:text-[20px]">
                        Karim Biswas
                    </h3>
                    <img
                        src={badge}
                        alt="User Badge"
                        className="inline h-[32px] w-[16px] ml-2 -my-4"
                    />
                    <h4 className="text-[11px] sm:text-[13px] md:text-[15px] text-gray">
                        @KarimB
                    </h4>
                    <h4 className="font-medium text-[11px] sm:text-[13px] md:text-[15px] text-gray">
                        From Dhaka
                    </h4>
                </a>
            </div>
        </>
    );
}
