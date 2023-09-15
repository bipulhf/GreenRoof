import user_photo from "/assets/forum/user_profile_photo_104x104.png";

export default function CommunityUserProfileCard() {
    return (
        <div className="flex justify-evenly py-7">
            <div className="flex">
                <img
                    src={user_photo}
                    alt="User Photo"
                    className="w-[104px] h-[104px]"
                />
                <div className="ml-5 self-center">
                    <h2 className="font-semibold text-[22px]">Karim Biswas</h2>
                    <h3 className="text-gray font-medium text-[18px]">
                        @KarimB
                    </h3>
                    <h3 className="text-[16px]">From Dhaka</h3>
                </div>
            </div>
            <div className="text-center self-center">
                <h2 className="font-semibold text-[22px]">20</h2>
                <h3 className="text-gray font-medium text-[18px]">Followers</h3>
            </div>
            <div className="text-center self-center">
                <h2 className="font-semibold text-[22px]">20</h2>
                <h3 className="text-gray font-medium text-[18px]">
                    Followings
                </h3>
            </div>
        </div>
    );
}
