import badge from "/assets/forum/user_badge_16x32.png";

interface Props {
    firstName: string;
    lastName: string;
    username: string;
    profilePhoto: string;
    city: string;
}

export default function ForumUserInfo({
    firstName,
    lastName,
    username,
    city,
    profilePhoto,
}: Props) {
    return (
        <>
            <div className="mt-2 mb-10 user-card flex flex-col justify-center items-center">
                <img
                    src={profilePhoto}
                    alt="User Profile Photo"
                    className="w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] md:w-[104px] md:h-[104px] rounded-full mr-2"
                />
                <a href="" className="username text-center">
                    <h3 className="inline font-semibold text-[16px] sm:text-[18px] md:text-[20px] dark:text-white">
                        {firstName + " " + lastName}
                    </h3>
                    <img
                        src={badge}
                        alt="User Badge"
                        className="inline h-[32px] w-[16px] ml-2 -my-4"
                    />
                    <h4 className="text-[11px] sm:text-[13px] md:text-[15px] text-gray dark:text-darksecondary">
                        @{username}
                    </h4>
                    <h4 className="font-medium text-[11px] sm:text-[13px] md:text-[15px] text-gray dark:text-white">
                        From {city}
                    </h4>
                </a>
            </div>
        </>
    );
}
