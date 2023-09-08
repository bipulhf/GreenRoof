import { Link } from "react-router-dom";

export default function AskQuestion() {
    return (
        <>
            <Link to={"/forum/post/create"}>
                <button className="p-1 rounded-full bg-greenbtn text-white text-[12px] hover:bg-greenttl sm:text-[15px] md:text-[18px] md:px-3 text-medium">
                    Ask Question
                </button>
            </Link>
        </>
    );
}
