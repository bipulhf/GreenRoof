import user_photo from "/assets/forum/forum_question_user_photo_30x30.png";

interface Props {
    firstName: string;
    lastName: string;
    username: string;
}

export default function ForumAnswererInfo({
    firstName,
    lastName,
    username,
}: Props) {
    return (
        <>
            <div className="self-center col-span-4 sm:col-span-3 md:col-span-2 text-center mr-4">
                <div className="flex text-left mb-3">
                    <img
                        src={user_photo}
                        alt="User Photo"
                        className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] rounded-full mr-[5px] mt-[5px]"
                    />
                    <a href="" className="username">
                        <h3 className="font-semibold text-[11px] sm:text-[13px] md:text-[16px]">
                            {firstName + " " + lastName}
                        </h3>
                        <h4 className="font-medium text-[9px] sm:text-[11px] md:text-[13px] text-gray">
                            @{username}
                        </h4>
                    </a>
                </div>
                <a href="" className="text-gray font-medium text-[12px]">
                    Edit Answer
                </a>
            </div>
        </>
    );
}
