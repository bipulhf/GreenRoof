import bird from "/assets/community/bird.svg";
import bird2 from "/assets/community/bird2.svg";
import bird3 from "/assets/community/bird3.svg";
import cloud from "/assets/community/cloud.svg";
import cloud2 from "/assets/community/cloud2.svg";
import cloud3 from "/assets/community/cloud3.svg";

export default function Background() {
    return (
        <div>
            <img
                src={bird}
                alt="Bird"
                className="absolute max-md:w-[10%] right-[10%] top-[30%] min-[1100px]:left-[22%] min-[1100px]:top-[5%]"
            />
            <img
                src={bird2}
                alt="Bird"
                className="absolute max-md:w-[8%] left-[20%] top-[40%] min-[1100px]:left-[50%] min-[1100px]:top-[10%]"
            />
            <img
                src={bird3}
                alt="Bird"
                className="absolute right-[50%] top-[50%] min-[1100px]:right-[5%] min-[1100px]:top-[10%]"
            />
            <img
                src={cloud}
                alt="Cloud"
                className="absolute max-md:w-[25%] top-[10%] left-[5%] sm:top-[5%] min-[1100px]:left-[10%] min-[1100px]:top-[12%]"
            />
            <img
                src={cloud2}
                alt="Cloud"
                className="absolute max-md:w-[30%] right-[15%] top-[40%] min-[1100px]:left-[55%] min-[1100px]:top-[10%]"
            />
            <img
                src={cloud3}
                alt="Cloud"
                className="absolute max-md:w-[40%] right-[5%] top-[10%] min-[1100px]:right-[10%] min-[1100px]:top-[15%]"
            />
        </div>
    );
}
