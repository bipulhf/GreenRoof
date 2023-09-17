import { Link } from "react-router-dom";
import roofTopImage from "/assets/community/roof-desktop.svg";
import vector from "/assets/community/vector1.png";

export default function Home() {
    return (
        <div className="flex max-lg:flex-col justify-between">
            <div className="m-[8%]">
                <h1 className="font-extrabold text-greenbtn text-5xl sm:text-7xl md:text-9xl">
                    Roof to Root
                </h1>
                <h2 className="mt-[1%] font-extrabold text-cyan text-3xl sm:text-5xl md:text-7xl">
                    A Unified Connection
                </h2>
                <h3 className="font-bold sm:text-xl md:text-3xl mt-[5%]">
                    Join Our Rooftop Gardening Community <br /> Where Gardens
                    Flourish and Friendships Grow.
                </h3>
                <div className="mt-[7%]">
                    <Link
                        to={"/register"}
                        className="bg-brown rounded-full px-5 py-3 text-2xl md:text-3xl font-medium text-white mt-[5%] mr-[10%] hover:underline"
                    >
                        Join Now
                    </Link>
                    <Link
                        to={"/login"}
                        className="bg-greenbtn rounded-full px-5 py-3 text-2xl md:text-3xl font-medium text-white hover:underline"
                    >
                        Login
                    </Link>
                </div>
                <img
                    src={vector}
                    alt="Vector"
                    className="lg:w-[30%] absolute bottom-0 max-lg:hidden left-[10%]"
                />
            </div>
            <img
                src={roofTopImage}
                alt="Roof Top Image"
                className="w-[100%] md:w-[80%] self-center lg:w-[50%] max-md:absolute lg:absolute bottom-0 right-0"
            />
        </div>
    );
}
