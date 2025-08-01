import React, {useState} from 'react';
import {Link} from "react-router-dom";
import AuthService from "./api/AuthService.js";
import MyModal from "./ui/modal/MyModal.jsx";

const Header = (props) => {

    const [about, setAbout] = useState(false);
    const [contact, setContact] = useState(false);

    return (
        <header className="fixed w-full bg-[#fff] z-[100] shadow">
            <div className="mx-auto max-w-[1500px] w-full">
                <div className="flex justify-between w-full h-[75px] truncate items-center">
                    <Link to="/">
                        <img className="w-full max-w-[150px]" src={props.logo} alt="Логотип"/>
                    </Link>
                    <nav>
                        <ul className="flex gap-[50px] list-none inter-300">
                            <li className="cursor-pointer transition delay-150 duration-200 ease-in-out hover:opacity-50">
                                <Link to="/">Главная</Link>
                            </li>
                            <li className="cursor-pointer transition delay-150 duration-200 ease-in-out hover:opacity-50" onClick={() => setAbout(true)}>
                                О нас
                            </li>
                            <li className="cursor-pointer transition delay-150 duration-200 ease-in-out hover:opacity-50" onClick={() => setContact(true)}>
                                Контакты
                            </li>
                            {AuthService.checkAuth() ?
                                <div className="flex gap-[50px]">
                                    <li className="cursor-pointer transition delay-150 duration-200 ease-in-out hover:opacity-50">
                                        <Link to="/bucket">Корзина</Link>
                                    </li>
                                    <li className="cursor-pointer transition delay-150 duration-200 ease-in-out hover:opacity-50">
                                        <Link to="/profile">Профиль</Link>
                                    </li>
                                </div>
                            :
                                <li className="cursor-pointer transition delay-150 duration-200 ease-in-out hover:opacity-50">
                                    <Link to="/register">Зарегестрироваться</Link>
                                </li>}
                        </ul>
                    </nav>
                </div>
            </div>
            <MyModal setVisible={setAbout} visible={about}>О нас</MyModal>
            <MyModal setVisible={setContact} visible={contact}>Контакты</MyModal>
        </header>
    );
};

export default Header;