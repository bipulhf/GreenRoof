import { Link } from "react-router-dom";
import roofTopImage from "/assets/community/roof-desktop.svg";
import vector from "/assets/community/vector1.png";

export default function Home() {
    return (
        <div className="flex max-lg:flex-col justify-between max-lg:min-h-screen">
            <div className="m-[8%]">
                <h1 className="relative z-10 font-extrabold text-greenbtn text-5xl sm:text-7xl md:text-9xl animate-flip-up animate-once animate-ease-in-out">
                    Roof to Root
                </h1>
                <h2 className="relative z-10 mt-[1%] font-extrabold text-cyan text-3xl sm:text-5xl md:text-7xl animate-flip-up animate-once animate-delay-500 animate-ease-in-out">
                    A Unified Connection
                </h2>
                <h3 className="relative z-10 font-bold sm:text-xl md:text-3xl mt-[5%] animate-flip-up animate-once animate-delay-[850ms] animate-ease-in-out">
                    Join Our Rooftop Gardening Community <br /> Where Gardens
                    Flourish and Friendships Grow.
                </h3>
                <div className="relative z-10 mt-[7%] animate-fade-up animate-once animate-delay-[1100ms] animate-ease-in-out">
                    <Link
                        to={"/register"}
                        className="bg-brown rounded-full px-5 py-3 text-2xl md:text-3xl font-semibold text-white mt-[5%] mr-[10%] hover:underline"
                    >
                        Join Now
                    </Link>
                    <Link
                        to={"/login"}
                        className="bg-greenbtn rounded-full px-5 py-3 text-2xl md:text-3xl font-semibold text-white hover:underline"
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
