import user_profile_photo from "/assets/forum/forum_top_user_photo_40x40.png";
export default function CommunityWhoToFollow() {
    return (
        <div className="flex px-[5%] min-[1200px]:px-[10%] pb-[5%]">
            <img
                src={user_profile_photo}
                alt="User Photo"
                className="h-[40px] w-[40px] mr-5"
            />
            <div className="mr-7">
                <h2 className="font-medium text-[16px]">Karim Biswas</h2>
                <h3 className="text-gray text-[14px]">@KarimB</h3>
            </div>
            <button className="self-center h-fit border rounded-full bg-greenbtn text-white text-[14px] px-3 py-1">
                Follow
            </button>
        </div>
    );
}
