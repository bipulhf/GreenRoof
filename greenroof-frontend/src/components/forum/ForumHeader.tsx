import AIAssistant from "../AIAssistant";
import forum_logo from "/assets/forum/forum_logo.png";

export default function ForumHeader() {
    return (
        <>
            <header className="grid grid-cols-9 max-[1200px]:grid-cols-none">
                <div className="header-title my-[10px] col-span-7 flex">
                    <div className="image">
                        <img
                            className="w-[77px] md:w-[122px]"
                            src={forum_logo}
                            alt="Green Roof Logo"
                        />
                    </div>
                    <div className="title-slogan my-[16px] md:my-[33px]">
                        <h1 className="text-greenttl font-bold text-2xl md:text-4xl lg:text-5xl">
                            Green Roof Forum
                        </h1>
                        <h3 className="text-brown font-bold text-sm md:text-xl lg:text-2xl">
                            Roof to Root : A Unified Connection
                        </h3>
                    </div>
                </div>
                <div className="max-[1200px]:hidden my-[60px] w-[174px] h-[36px] rounded-[100px] border-2 border-solid border-greenbtn">
                    <AIAssistant />
                </div>
            </header>
        </>
    );
}
