import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ForumSearch() {
    return (
        <>
            <div className="search-title w-[269px] bg-graybg rounded-[27px] px-[18px] py-[12px] mb-[15px]">
                <div className="mb-[12px]">
                    <span className="mr-[21px]">
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            fontSize={20}
                        />
                    </span>
                    <span className="text-[20px] font-medium">Search</span>
                </div>
                <form method="get">
                    <input
                        className="search-box w-[240px] h-[35px] border-2 border-black rounded-[27px] p-[18px] text-[16px]"
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search on forum..."
                    />
                </form>
            </div>
        </>
    );
}
