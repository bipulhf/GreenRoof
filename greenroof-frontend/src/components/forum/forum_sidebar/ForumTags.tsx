import { faFolderTree } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetTags } from "../../../hooks/useQuestion";
import { Link } from "react-router-dom";

export default function ForumTags() {
    const { data: tags, isLoading, error, isError } = useGetTags();

    return (
        <>
            <div className="search-title w-[269px] bg-graybg rounded-[27px] px-[18px] py-[12px] mb-[15px] dark:bg-darkprimary dark:text-white">
                <div className="mb-[12px]">
                    <span className="mr-[21px]">
                        <FontAwesomeIcon icon={faFolderTree} fontSize={20} />
                    </span>
                    <span className="text-[20px] font-medium">Tags</span>
                </div>
                {isError && <p className="text-red">{error.message}</p>}
                {isLoading && <p>Loading...</p>}
                <div className="flex justify-between text-[18px] font-medium">
                    <ul className="tags">
                        {tags?.map((tag) => (
                            <li key={tag.id}>
                                <Link to={"/forum/tag/" + tag.tag}>
                                    {tag.tag}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
