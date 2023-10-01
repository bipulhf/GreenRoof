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
                <div className="profile-img">
                    <img
                        src={profilePhoto}
                        alt="User Profile Photo"
                        className="max-w-[45px] max-h-[45px] min-w-[45px] min-h-[45px] sm:max-w-[55px] sm:max-h-[55px] md:max-w-[104px] md:max-h-[104px] sm:min-w-[55px] sm:min-h-[55px] md:min-w-[104px] md:min-h-[104px] rounded-full mr-2"
                    />
                </div>
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
