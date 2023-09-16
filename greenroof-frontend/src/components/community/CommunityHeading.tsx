import { Link } from "react-router-dom";
import forum_logo from "/assets/forum/forum_logo.svg";

interface Props {
    heading: string;
}

export default function CommunityHeading({ heading }: Props) {
    return (
        <>
            <div className="md:hidden absolute w-[80px] h-[80px]">
                <Link to={"/community"}>
                    <img src={forum_logo} />
                </Link>
            </div>
            <div className="pt-10 pb-5">
                <h1 className="font-bold text-[22px] text-brown text-center">
                    {heading}
                </h1>
            </div>
        </>
    );
}
