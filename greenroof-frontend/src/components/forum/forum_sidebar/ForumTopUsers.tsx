import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import user_profile_photo from "/assets/forum/forum_top_user_photo_40x40.png";
import useTopUser from "../../../hooks/useTopUser";
import { Link } from "react-router-dom";

export default function ForumTopUsers() {
    const { data: users, error, isLoading } = useTopUser();
    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Network Error...</p>}
            <div className="search-title w-[269px] bg-graybg rounded-[27px] px-[18px] py-[12px] mb-[15px]">
                <div className="mb-[12px]">
                    <span className="mr-[21px]">
                        <FontAwesomeIcon icon={faUser} fontSize={20} />
                    </span>
                    <span className="text-[20px] font-medium">Top Users</span>
                </div>
                <ol>
                    {users?.map((user) => (
                        <li key={user.id} className="flex mb-[10px]">
                            <img
                                src={user_profile_photo}
                                alt="User Photo"
                                className="w-[40px] h-[40px] rounded-full mt-[10px] mr-[12px]"
                            />
                            <div>
                                <Link
                                    to={"/forum/user/" + user.username}
                                    className="font-semibold text-[16px]"
                                >
                                    {user.firstName + " " + user.lastName}
                                </Link>
                                <h4 className="font-medium text-[14px] text-gray">
                                    @{user.username}
                                </h4>
                                <h4 className="font-semibold text-gray text-[14px]">
                                    {user.score} Answers
                                </h4>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </>
    );
}
