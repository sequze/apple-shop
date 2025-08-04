import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import AuthService from "./api/AuthService.js";
import MyModal from "./ui/modal/MyModal.jsx";
import Loader from "./Loader.jsx";
import AboutContent from "./modals/AboutContent.jsx";
import ContactContent from "./modals/ContactContent.jsx";

const Header = (props) => {

    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        const check = async () => {
            try {
                const auth = await AuthService.checkAuth();
                setIsAuth(auth);
            } catch (e) {
                setIsAuth(false);
            }
        };
        check();
    }, []);

    const menuLink = "cursor-pointer transition delay-150 duration-200 ease-in-out hover:opacity-50";

    return (
        <header className="fixed w-full bg-[#fff] z-[100] shadow">
            {isAuth == null ? (
                <Loader />
            ) : (
                <>
                    <div className="mx-auto max-w-[1500px] w-full">
                        <div className="flex justify-between w-full h-[75px] truncate items-center">
                            <Link to="/">
                                <img className="max-w-[150px]" src={props.logo} alt="Логотип"/>
                            </Link>
                            <nav>
                                <ul className="flex gap-[50px] list-none inter-300">
                                    <li className={menuLink}>
                                        <Link to="/">Главная</Link>
                                    </li>
                                    <li className={menuLink} onClick={() => setIsAboutModalOpen(true)}>
                                        О нас
                                    </li>
                                    <li className={menuLink} onClick={() => setIsContactModalOpen(true)}>
                                        Контакты
                                    </li>
                                    {isAuth ? (
                                        <>
                                            <li className={menuLink}>
                                                <Link to="/bucket">Корзина</Link>
                                            </li>
                                            <li className={menuLink}>
                                                <Link to="/profile">Профиль</Link>
                                            </li>
                                        </>
                                    ) : (
                                        <li className={menuLink}>
                                            <Link to="/register">Зарегистрироваться</Link>
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