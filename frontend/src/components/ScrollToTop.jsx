import {useLocation} from "react-router-dom";
import {useEffect} from "react";

const scrollToTop = () => {
    const {pathname} = useLocation()

    useEffect(() => {
        window.scroll(0, 0);
    }, [pathname]);

    return null;
}

export default scrollToTop;