import { Link } from "react-router-dom";
import user_photo from "/assets/forum/forum_question_user_photo_30x30.png";

interface Props {
    firstName: string;
    lastName: string;
    username: string;
}

export default function ForumQuestionerInfo({
    firstName,
    lastName,
    username,
}: Props) {
    return (
        <>
            <div className="self-center col-span-4 sm:col-span-3 md:col-span-2 text-center mr-4">
                <div className="questioner flex text-left mb-3">
                    <img
                        src={user_photo}
                        alt="User Photo"
                        className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] rounded-full mr-[5px] mt-[5px]"
                    />
                    <Link to={"/forum/user/" + username} className="username">
                        <h3 className="font-semibold text-[11px] sm:text-[13px] md:text-[16px]">
                            {firstName + " " + lastName}
                        </h3>
                        <h4 className="font-medium text-[9px] sm:text-[11px] md:text-[13px] text-gray">
                            @{username}
                        </h4>
                    </Link>
                </div>
                <div className="answers-no mt-[25px]">
                    <h3 className="font-semibold text-gray text-[10px] sm:text-[12px]">
                        <a href="">2 Answers</a>
                    </h3>
                    <a href="" className="text-gray font-medium text-[12px]">
                        Edit Question
                    </a>
                </div>
            </div>
        </>
    );
}
