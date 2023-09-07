import AIAssistant from "../../AIAssistant";
import ForumCategories from "./ForumCategories";
import ForumSearch from "./ForumSearch";
import ForumTopUsers from "./ForumTopUsers";

export default function ForumSidebar() {
    return (
        <div className="ml-[40px] mt-[40px] max-lg:hidden transition-all duration-500 ease-in-out">
            <div className="min-[1200px]:hidden mb-[15px] w-[174px] h-[36px] rounded-[100px] border-2 border-solid border-greenbtn">
                <AIAssistant />
            </div>
            <ForumSearch />
            <ForumCategories />
            <ForumTopUsers />
        </div>
    );
}
