import user_photo from "/assets/forum/user_profile_photo_104x104.png";

export default function CommunityUserProfileCard() {
    return (
        <div className="sm:flex justify-evenly py-7">
            <div className="flex ml-5">
                <img
                    src={user_photo}
                    alt="User Photo"
                    className="max-[490px]:w-[80px] max-[490px]:h-[80px] w-[104px] h-[104px]"
                />
                <div className="ml-5 self-center">
                    <h2 className="font-semibold text-[22px] max-[490px]:text-[18px] ">
                        Karim Biswas
                    </h2>
                    <h3 className="text-gray font-medium max-[490px]:text-[15px] text-[18px]">
                        @KarimB
                    </h3>
                    <h3 className="text-[16px] max-[490px]:text-[14px] ">
                        From Dhaka
                    </h3>
                </div>
            </div>
            <div className="flex max-sm:mt-5 justify-evenly">
                <div className="text-center self-center mx-5 md:mx-8">
                    <h2 className="font-semibold text-[22px] max-[490px]:text-[16px]">
                        20
                    </h2>
                    <h3 className="text-gray font-medium max-[490px]:text-[14px] text-[18px]">
                        Followers
                    </h3>
                </div>
                <div className="text-center self-center mx-5 md:mx-8">
                    <h2 className="font-semibold text-[22px] max-[490px]:text-[16px]">
                        20
                    </h2>
                    <h3 className="text-gray font-medium max-[490px]:text-[14px] text-[18px]">
                        Followings
                    </h3>
                </div>
            </div>
        </div>
    );
}
