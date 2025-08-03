import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import AuthService from "./api/AuthService.js";
import MyModal from "./ui/modal/MyModal.jsx";

const Header = (props) => {

    const [about, setAbout] = useState(false);
    const [contact, setContact] = useState(false);
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        const check = async () => {
            const auth = await AuthService.checkAuth();
            setIsAuth(auth);
        };
        check();
    }, []);

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
                            {isAuth ?
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
            <MyModal setVisible={setAbout} visible={about}>
                <h2 className="text-[24px] inter-600 mb-[10px]">О нас</h2>
                <p className="mb-[20px]">
                    Мы — команда, которая по-настоящему любит технику Apple. Наша цель — сделать качественные устройства доступными, понятными и честными для каждого покупателя. Мы тщательно проверяем каждый товар, следим за актуальностью цен и делаем всё, чтобы вы остались довольны своей покупкой.
                </p>

                <h3 className="text-[18px] inter-600 my-[10px]">Почему выбирают нас:</h3>
                <ul className="list-disc grid gap-y-2 mb-[20px]">
                    <li>Оригинальная продукция Apple с официальной гарантией</li>
                    <li>Прозрачные цены и честное описание каждого товара</li>
                    <li>Поддержка на каждом этапе — от выбора до получения</li>
                    <li>Быстрая доставка по всей России</li>
                    <li>Возможность рассрочки и Trade-In</li>
                </ul>

                <h3 className="text-[18px] inter-600 my-[10px]">Наша философия</h3>
                <p className="mb-[20px]">
                    Мы не просто продаём устройства — мы помогаем людям находить удобство, стиль и вдохновение в технологии. Техника Apple — это про эстетику, надёжность и комфорт. Мы хотим, чтобы каждая покупка была не просто выгодной, но и приятной.
                </p>

                <h3 className="text-[18px] inter-600 my-[10px]">Контакты</h3>
                <p>
                    📧 email@example.com<br/>
                    📱 +7 (___) ___-__-__<br/>
                    🕘 Работаем ежедневно с 10:00 до 20:00
                </p>
            </MyModal>
            <MyModal setVisible={setContact} visible={contact}>
                <h2 className="text-[24px] inter-600 mb-[10px]">Контакты</h2>
                <p className="mb-[10px]">
                    Если у вас есть вопросы по заказу, нужна консультация по выбору техники или возникли сложности — мы всегда готовы помочь.
                </p>

                <h3 className="text-[18px] inter-600 my-[10px]">Связаться с нами:</h3>
                <ul className="grid gap-y-2 mb-[20px]">
                    <li><strong>📞 Телефон:</strong> +7 (999) 123-45-67</li>
                    <li><strong>📧 Email:</strong> support@example.com</li>
                    <li><strong>💬 Telegram:</strong> <a href="#" className="underline text-blue-600">@bot</a></li>
                </ul>

                <h3 className="text-[18px] inter-600 my-[10px]">Время работы:</h3>
                <p className="mb-[20px]">
                    Пн–Вс: 10:00 – 20:00 (МСК)
                </p>

                <h3 className="text-[18px] inter-600 my-[10px]">Адрес (если есть):</h3>
                <p className="mb-[20px]">
                    г. Казань, ул. Кремлевская, 35
                </p>

                <h3 className="text-[18px] inter-600 my-[10px]">Мы в соцсетях:</h3>
                <ul className="grid gap-y-2">
                    <li><a href="#" className="underline text-blue-600">VK</a></li>
                    <li><a href="#" className="underline text-blue-600">Telegram-канал</a></li>
                </ul>

            </MyModal>
        </header>
    );
};

export default Header;