import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTopUser from "../../../hooks/useTopUser";
import { Link } from "react-router-dom";
import Name from "../../Name";

export default function ForumTopUsers() {
    const { data: users, error, isLoading } = useTopUser();
    return (
        <>
            <div className="search-title w-[269px] bg-graybg rounded-[27px] px-[18px] py-[12px] mb-[15px] dark:bg-darkprimary dark:text-white">
                <div className="mb-[12px]">
                    <span className="mr-[21px]">
                        <FontAwesomeIcon icon={faUser} fontSize={20} />
                    </span>
                    <span className="text-[20px] font-medium">Top Users</span>
                </div>
                <ol>
                    {isLoading && <p>Loading...</p>}
                    {error && <p>Network Error...</p>}
                    {users?.map((user) => (
                        <li key={user.id} className="flex mb-[10px]">
                            <img
                                src={user.profilePhoto}
                                alt="User Photo"
                                className="w-[40px] h-[40px] rounded-full mt-[10px] mr-[12px]"
                            />
                            <div>
                                <Link
                                    to={"/forum/user/" + user.username}
                                    className="font-semibold text-[16px]"
                                >
                                    <Name
                                        firstName={user.firstName}
                                        lastName={user.lastName}
                                        score={user.score}
                                    />{" "}
                                </Link>
                                <h4 className="font-medium text-[14px] text-gray dark:text-darksecondary">
                                    @{user.username}
                                </h4>
                                <h4 className="font-semibold text-gray text-[14px] dark:text-darksecondary">
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
