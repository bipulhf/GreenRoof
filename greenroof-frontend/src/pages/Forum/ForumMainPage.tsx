import { useSearchParams } from "react-router-dom";
import ForumFeed from "../../components/forum/forum_feed/ForumFeed";
import ForumSearchResult from "../../components/forum/forum_sidebar/ForumSearchResult";

export default function ForumMainPage() {
    const [searchParams] = useSearchParams();
    return (
        <>
            {searchParams.size == 0 && <ForumFeed />}
            {searchParams.size != 0 && (
                <ForumSearchResult
                    search={searchParams.toString().substring(7)}
                />
            )}
        </>
    );
}
