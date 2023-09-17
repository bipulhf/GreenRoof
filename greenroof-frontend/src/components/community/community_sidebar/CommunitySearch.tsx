import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import CommunityHeading from "../CommunityHeading";
import CommunitySearchResult from "./CommunitySearchResult";

interface Inputs {
    search: string;
}

export default function CommunitySearch() {
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        navigate("?search=" + data.search);
    };
    const [searchParams] = useSearchParams();
    return (
        <div className="min-h-screen md:w-[68%] min-[1000px]:w-[53%] md:ml-[30%] min-[1000px]:ml-[22%] divide-y divide-graybg">
            <CommunityHeading heading="Search" />
            <div className="pt-[2%] flex flex-col">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="self-center w-[85%]"
                >
                    <input
                        {...register("search")}
                        className="search-box w-full h-[35px] border-2 border-black rounded-[27px] p-[18px] text-[13px] sm:text-[16px]"
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search on forum..."
                    />
                </form>
                {searchParams.get("search") && (
                    <div className="mt-[2%] self-center">
                        <h2 className="text-[14px] font-medium text-center">
                            Search Result for "{searchParams.get("search")}"
                        </h2>
                        <CommunitySearchResult
                            search={searchParams.get("search") || ""}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
