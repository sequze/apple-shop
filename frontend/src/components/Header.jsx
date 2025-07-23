import React from 'react';

const Header = (props) => {
    return (
        <header className="fixed w-full bg-[#fff] z-[100]">
            <div className="mx-auto max-w-[1500px] w-full">
                <div className="flex justify-between w-full h-[75px] truncate items-center">
                    <div>
                        <img className="w-full max-w-[150px]" src={props.logo} alt="Логотип"/>
                    </div>
                    <nav>
                        <ul className="flex gap-[50px] list-none inter-400">
                            <li className="cursor-pointer transition delay-150 duration-200 ease-in-out hover:opacity-50">Главная</li>
                            <li className="cursor-pointer transition delay-150 duration-200 ease-in-out hover:opacity-50">О нас</li>
                            <li className="cursor-pointer transition delay-150 duration-200 ease-in-out hover:opacity-50">Контакты</li>
                            <li className="cursor-pointer transition delay-150 duration-200 ease-in-out hover:opacity-50">Зарегестрироваться</li>
                        </ul>
                    </nav>
                </div>

            </div>
        </header>
    );
};

export default Header;