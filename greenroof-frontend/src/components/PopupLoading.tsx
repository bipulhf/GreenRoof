import forum_logo from "/assets/forum/forum_logo.svg";

export default function PopupLoading() {
    return (
        <div className="modal text-center font-semibold animate-pulse animate-infinite animate-ease-in-out flex flex-col">
            <img src={forum_logo} className="self-center" />
            <h2 className="text-2xl text-brown">
                Roof to Root : A Unified Connection
            </h2>
        </div>
    );
}
