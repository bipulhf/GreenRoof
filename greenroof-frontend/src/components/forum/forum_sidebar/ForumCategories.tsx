import { faFolderTree } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ForumCategories() {
    return (
        <>
            <div className="search-title w-[269px] bg-graybg rounded-[27px] px-[18px] py-[12px] mb-[15px] dark:bg-darkprimary dark:text-white">
                <div className="mb-[12px]">
                    <span className="mr-[21px]">
                        <FontAwesomeIcon icon={faFolderTree} fontSize={20} />
                    </span>
                    <span className="text-[20px] font-medium">Categories</span>
                </div>
                <div className="flex justify-between text-[18px] font-medium">
                    <ul>
                        <li>
                            <a href="">Cateogry</a>
                        </li>
                        <li>
                            <a href="">Cateogry</a>
                        </li>
                        <li>
                            <a href="">Cateogry</a>
                        </li>
                        <li>
                            <a href="">Cateogry</a>
                        </li>
                        <li>
                            <a href="">Cateogry</a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <a href="">Cateogry</a>
                        </li>
                        <li>
                            <a href="">Cateogry</a>
                        </li>
                        <li>
                            <a href="">Cateogry</a>
                        </li>
                        <li>
                            <a href="">Cateogry</a>
                        </li>
                        <li>
                            <a href="">Cateogry</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
