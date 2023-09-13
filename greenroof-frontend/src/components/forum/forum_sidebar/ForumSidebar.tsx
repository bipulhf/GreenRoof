import AIAssistant from "../../AIAssistant";
import ForumCategories from "./ForumCategories";
import ForumSearch from "./ForumSearch";
import ForumTopUsers from "./ForumTopUsers";

interface Props {
    menuOn: boolean;
}

export default function ForumSidebar({ menuOn }: Props) {
    return (
        <>
            <div
                className={`ml-[40px] mt-[40px] ${
                    menuOn
                        ? `pl-[620px] bg-white min-h-screen py-5 w-[900px] bg-opacity-80`
                        : `max-lg:hidden`
                } `}
            >
                <div className="min-[1200px]:hidden mb-[15px] w-[174px] h-[36px] rounded-[100px] border-2 border-solid border-greenbtn">
                    <AIAssistant />
                </div>
                <ForumSearch />
                <ForumCategories />
                <ForumTopUsers />
            </div>
        </>
    );
}
