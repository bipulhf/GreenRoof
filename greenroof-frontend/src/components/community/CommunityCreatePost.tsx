import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import user_profile_photo from "/assets/forum/forum_top_user_photo_40x40.png";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export default function CommunityCreatePost() {
    return (
        <div className="py-5 px-2 grid grid-cols-8">
            <img
                src={user_profile_photo}
                alt="Profile Photo"
                className="col-span-1 ml-5 min-h-[40px] min-w-[40px]"
            />
            <form action="post" className="col-span-7 flex max-[500px]:ml-10">
                <textarea
                    className="text-[16px] h-[80px] md:h-[105px] w-[90%] resize-none focus:outline-none"
                    name="post"
                    id="post"
                    placeholder="Share your photos, experiences..."
                />
                <div className="flex flex-col justify-evenly">
                    <FontAwesomeIcon
                        icon={faImage}
                        fontSize={16}
                        color="#B97246"
                    />
                    <button
                        type="submit"
                        className="self-center h-fit border rounded-full bg-greenbtn text-white text-[16px] px-5 py-1"
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
}
