import { Outlet } from "react-router-dom";

const PlainLayout = () => {
    return (
        <div className=' dark:bg-zinc-950'>
            <Outlet />
        </div>
    )
};

export default PlainLayout;
