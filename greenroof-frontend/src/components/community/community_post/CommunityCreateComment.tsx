import user_profile_photo from "/assets/forum/forum_top_user_photo_40x40.png";

export default function CommunityCreateComment() {
    return (
        <>
            <div className="py-5 px-2 grid grid-cols-10">
                <img
                    src={user_profile_photo}
                    alt="Profile Photo"
                    className="col-span-1 ml-5 h-[25px] w-[25px]"
                />
                <form action="post" className="col-span-9 flex ml-8">
                    <textarea
                        className="text-[14px] h-[60px] w-[90%] resize-none focus:outline-none"
                        name="post"
                        id="post"
                        placeholder="Type your thoughts about the post ..."
                    />
                    <button
                        type="submit"
                        className="self-end h-fit border rounded-full bg-greenbtn text-white text-[14px] px-3 py-1"
                    >
                        Comment
                    </button>
                </form>
            </div>
        </>
    );
}
