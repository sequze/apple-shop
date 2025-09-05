import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import MyModal from "./ui/modal/MyModal.jsx";
import Loader from "./Loader.jsx";
import AboutContent from "./modals/AboutContent.jsx";
import ContactContent from "./modals/ContactContent.jsx";
import {AuthContext} from "../context/AuthContext";
import {CartContext} from "../context/CartContext.jsx";

const Header = ({logo}) => {

    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const {isAuth} = useContext(AuthContext);
    const {cartItems} = useContext(CartContext);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

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

    const menuLink = "relative opacity-[0.6] cursor-pointer transition delay-250 duration-200 ease-in-out hover:opacity-[1]";
    const burgerLine = "block w-10 h-1 bg-black rounded-full  transition-all duration-200";

    return (
        <header className={`${isBurgerOpen ? "h-full bg-transparent" : ""}
                fixed w-full bg-[#fff] z-40 shadow flex flex-col items-center px-4 sm:px-10 lg:px-[60px]`}>
            <div className={`${isBurgerOpen ? "pointer-events-auto" : "-translate-y-[80%] opacity-0 pointer-events-none"} h-[100vh] absolute w-full bg-[#fff] transition-transform duration-300`} />
            {isAuth === null ? (
                    <div className="absolute top-0 left-0 w-full min-h-screen flex justify-center items-center bg-[#fff]">
                        <div className="w-[200px] h-[200px] flex justify-center">
                            <Loader />
                        </div>
                    </div>
            ) : (
                <>
                    <div className={`${isBurgerOpen ? "h-full" : ""} max-w-[1500px] w-full relative`}>
                        <div className={`
                         ${isBurgerOpen ? "h-full justify-center" : "justify-between "} flex w-full h-[75px] truncate items-center`}>
                            <Link className={ isBurgerOpen ? "absolute top-0 -translate-y-9 left-0" : ""} to="/" onClick={() => setIsBurgerOpen(false)}>
                                <img className="max-w-[150px]" src={logo} alt="Логотип"/>
                            </Link>

                            <div
                                className="relative flex-1 max-w-lg w-full mx-4 lg:mx-8 opacity-[0.6]"
                            >
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Поиск товаров..."
                                    className="placeholder:text-[#000] inter-300 w-full pl-12 pr-10 py-2 rounded-[20px] border border-[#000] focus:outline-none focus:ring-2 focus:ring-[#000] transition "
                                />
                                <div className="absolute left-3 top-1/2 -translate-y-2.5 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                                    </svg>
                                </div>
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
                                    >
                                        &times;
                                    </button>
                                )}
                            </div>

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
                                            <li className="relative">
                                                <Link  className={menuLink} to="/bucket" onClick={() => setIsBurgerOpen(false)}>Корзина</Link>
                                                {cartItems?.length && (
                                                    <div className="absolute top-[-10px] right-[-15px]
                                                     bg-red-500 text-white px-2 py-.5 rounded-full">
                                                        {cartItems?.length > 99 ?  "99+" : cartItems?.length}
                                                    </div>
                                                )}
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