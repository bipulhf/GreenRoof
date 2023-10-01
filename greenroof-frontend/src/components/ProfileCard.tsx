import { Link } from "react-router-dom";
import { User } from "../services/Types";

interface Props {
    user: User;
}
export default function ProfileCard({ user }: Props) {
    return (
        <>
            <div className="flex mt-5 mr-2 justify-center">
                <div className="w-[250px]">
                    <div className="bg-white border-black border rounded-lg py-3">
                        <div className="photo-wrapper p-2">
                            <img
                                className="w-32 h-32 rounded-full mx-auto"
                                src={user.profilePhoto}
                                alt={user.username}
                            />
                        </div>
                        <div className="p-2">
                            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                                {user.firstName + " " + user.lastName}
                            </h3>
                            <div className="text-center text-gray-400 text-xs font-semibold">
                                <p>{user.username}</p>
                            </div>
                            <div className="text-center text-gray-400 text-xs font-semibold">
                                <p>From {user.city}</p>
                            </div>

                            <div className="text-center my-3">
                                <Link
                                    to={"/community/profile/" + user.username}
                                    className="text-xs text-green hover:underline hover:text-greenttl font-medium"
                                >
                                    View Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
