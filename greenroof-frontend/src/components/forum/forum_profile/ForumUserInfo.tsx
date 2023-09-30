import Name from "../../Name";

interface Props {
    firstName: string;
    lastName: string;
    username: string;
    profilePhoto: string;
    score: number;
    city: string;
}

export default function ForumUserInfo({
    firstName,
    lastName,
    username,
    city,
    score,
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
                <div className="username text-center">
                    <h3 className="inline font-semibold text-[16px] sm:text-[18px] md:text-[20px] dark:text-white">
                        <Name
                            firstName={firstName}
                            lastName={lastName}
                            score={score}
                        />
                    </h3>
                    <h4 className="text-[11px] sm:text-[13px] md:text-[15px] text-gray dark:text-darksecondary">
                        @{username}
                    </h4>
                    <h4 className="font-medium text-[11px] sm:text-[13px] md:text-[15px] text-gray dark:text-white">
                        From {city}
                    </h4>
                </div>
            </div>
        </>
    );
}
