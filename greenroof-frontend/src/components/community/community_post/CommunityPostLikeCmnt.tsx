import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faComment,
    faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import {
    useGetNumberOfLikes,
    useLike,
    useLikedByUser,
} from "../../../hooks/useLike";
import { useGetNumberOfComment } from "../../../hooks/useComment";
import { Link } from "react-router-dom";

interface Props {
    postId: number;
}

export default function CommunityPostLikeCmnt({ postId }: Props) {
    const { data: numberOfLikes } = useGetNumberOfLikes(postId);
    const mutation = useLike(postId);
    const { data: hasLiked } = useLikedByUser(postId);
    const { data: numberOfComments } = useGetNumberOfComment(postId);

    const [solid, setSolid] = useState(false);

    const like = () => {
        setSolid(!solid);
        mutation.mutate();
    };

    useEffect(() => {
        setSolid(hasLiked?.userLiked || false);
    }, [hasLiked]);
    return (
        <>
            <div className="flex pt-3">
                <div>
                    <FontAwesomeIcon
                        icon={solid ? fasHeart : farHeart}
                        className="hover:cursor-pointer text-[16px] text-red"
                        onClick={like}
                    />
                    <span className="font-medium text-[16px] pl-2 pr-10">
                        {numberOfLikes?.totalLikes}
                    </span>
                </div>
                <Link to={"post/" + postId}>
                    <FontAwesomeIcon
                        icon={faComment}
                        className="hover:cursor-pointer text-[16px] text-brown"
                    />
                    <span className="font-medium text-[16px] pl-2">
                        {numberOfComments?.numberOfComments}
                    </span>
                </Link>
            </div>
        </>
    );
}
