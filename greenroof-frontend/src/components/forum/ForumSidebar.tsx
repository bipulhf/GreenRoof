import AIAssistant from "../AIAssistant";
import ForumCategories from "./forum_sidebar/ForumCategories";
import ForumSearch from "./forum_sidebar/ForumSearch";
import ForumTopUsers from "./forum_sidebar/ForumTopUsers";

export default function ForumSidebar() {
    return (
        <div className="ml-[40px] mt-[40px] max-lg:hidden">
            <div className="min-[1200px]:hidden mb-[15px] w-[174px] h-[36px] rounded-[100px] border-2 border-solid border-greenbtn">
                <AIAssistant />
            </div>
            <ForumSearch />
            <ForumCategories />
            <ForumTopUsers />
        </div>
    );
}
