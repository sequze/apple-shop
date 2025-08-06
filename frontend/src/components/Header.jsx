import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import MyModal from "./ui/modal/MyModal.jsx";
import Loader from "./Loader.jsx";
import AboutContent from "./modals/AboutContent.jsx";
import ContactContent from "./modals/ContactContent.jsx";
import {AuthContext} from "../context/context.js";

const Header = ({logo}) => {

    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const {isAuth} = useContext(AuthContext);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);


    useEffect(() => {
        if (isBurgerOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [isBurgerOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsBurgerOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const menuLink = "cursor-pointer transition delay-250 duration-200 ease-in-out hover:opacity-50";
    const burgerLine = "block w-10 h-1 bg-black rounded-full  transition-all duration-200";

    return (
        <header className={`${isBurgerOpen ? "h-full bg-transparent" : ""}
                fixed w-full bg-[#fff] z-[100] shadow flex flex-col items-center px-4 sm:px-10 lg:px-[60px]`}>
            <div className={`${isBurgerOpen ? "pointer-events-auto" : "-translate-y-[80%] opacity-0 pointer-events-none"} h-[100vh] absolute w-full bg-[#fff] transition-transform duration-300`} />
            {isAuth == null ? (
                <Loader />
            ) : (
                <>
                    <div className={`${isBurgerOpen ? "h-full" : ""} max-w-[1500px] w-full relative`}>
                        <div className={`
                         ${isBurgerOpen ? "h-full justify-center" : "justify-between "} flex w-full h-[75px] truncate items-center`}>
                            <Link className={ isBurgerOpen ? "absolute top-0 -translate-y-9 left-0" : ""} to="/" onClick={() => setIsBurgerOpen(false)}>
                                <img className="max-w-[150px]" src={logo} alt="Логотип"/>
                            </Link>
                            <nav>
                                <button
                                    className={`${isBurgerOpen ? "top-0 translate-y-1/2 -translate-x-1/2" : "top-1/2 -translate-y-1/2"} absolute right-0 lg:hidden space-y-2 p-2`}
                                    onClick={() => setIsBurgerOpen(!isBurgerOpen)}>
                                    <span className={(isBurgerOpen ? "rotate-45 translate-y-2.5 " : " ") + burgerLine}></span>
                                    <span className={isBurgerOpen ? "opacity-0 " : "" + burgerLine}></span>
                                    <span className={(isBurgerOpen ? "-rotate-45  " : "") + burgerLine}></span>
                                </button>
                                <ul className={`${
                                    isBurgerOpen ? "flex flex-col items-center text-[24px]" : "hidden"
                                }
                                    lg:flex gap-[50px] list-none inter-300`}>
                                    <li className={menuLink}>
                                        <Link to="/" onClick={() => setIsBurgerOpen(false)}>Главная</Link>
                                    </li>
                                    <li className={menuLink} onClick={() => {
                                        setIsAboutModalOpen(true);
                                        setIsBurgerOpen(false);
                                    }}>
                                        О нас
                                    </li>
                                    <li className={menuLink} onClick={() => {
                                        setIsContactModalOpen(true);
                                        setIsBurgerOpen(false);
                                    }}>
                                        Контакты
                                    </li>
                                    {isAuth ? (
                                        <>
                                            <li className={menuLink}>
                                                <Link to="/bucket" onClick={() => setIsBurgerOpen(false)}>Корзина</Link>
                                            </li>
                                            <li className={menuLink}>
                                                <Link to="/profile" onClick={() => setIsBurgerOpen(false)}>Профиль</Link>
                                            </li>
                                        </>
                                    ) : (
                                        <li className={menuLink}>
                                            <Link to="/register" onClick={() => setIsBurgerOpen(false)}>Зарегистрироваться</Link>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <MyModal setVisible={setIsAboutModalOpen} visible={isAboutModalOpen}>
                        <AboutContent />
                    </MyModal>
                    <MyModal setVisible={setIsContactModalOpen} visible={isContactModalOpen}>
                        <ContactContent />
                    </MyModal>
                </>
            )}
        </header>
    );
};

export default Header;