import user_profile_photo from "/assets/forum/forum_top_user_photo_40x40.png";

export default function CommunityComment() {
    return (
        <>
            <div className="py-5 px-2 grid grid-cols-10">
                <img
                    src={user_profile_photo}
                    alt="Profile Photo"
                    className="col-span-1 ml-5 w-[40px] h-[40px]"
                />
                <div className="col-span-9">
                    <div className="flex justify-between pb-1">
                        <div className="flex">
                            <h2 className="font-semibold text-[15px] mr-2">
                                Karim Biswas
                            </h2>
                            <h2 className="font-medium text-[13px] text-gray self-center">
                                @KarimB
                            </h2>
                        </div>
                        <div className="flex text-gray">
                            <h3 className="mx-5">Edit</h3>
                            <h3>Delete</h3>
                        </div>
                    </div>
                    <div className="pb-2">
                        <h3 className="text-[14px] text-justify">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Sequi enim impedit, dolore ipsum itaque ut
                            asperiores cum excepturi sint aliquid non unde
                            quisquam quia aut, voluptate nobis magni quas esse.
                        </h3>
                    </div>
                    <div>
                        <h3 className="text-gray text-[13px]">
                            15 September, 2023
                        </h3>
                    </div>
                </div>
            </div>
        </>
    );
}
