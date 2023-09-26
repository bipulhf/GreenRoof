import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Inputs {
    search: string;
}

export default function ForumSearch() {
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        navigate("?search=" + data.search);
    };
    return (
        <>
            <div className="search-title w-[269px] bg-graybg rounded-[27px] px-[18px] py-[12px] mb-[15px] dark:bg-darkprimary dark:text-white">
                <div className="mb-[12px]">
                    <span className="mr-[21px]">
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            fontSize={20}
                        />
                    </span>
                    <span className="text-[20px] font-medium">Search</span>
                </div>
                <form method="get" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register("search")}
                        className="search-box w-[240px] h-[35px] border-2 border-black rounded-[27px] p-[18px] text-[16px] dark:bg-darkprimary dark:text-white dark:border-white outline-none"
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
