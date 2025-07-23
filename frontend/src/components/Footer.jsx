import React from 'react';

const Footer = () => {
    return (
        <div className="h-[350px]">
            <div className="mx-auto max-w-[1500px] w-full">
                <div className="flex justify-between pt-[100px] leading-[1.4] text-[#000]/60">
                    <div className="flex flex-col">
                        <a className="hover:text-[#000] transition-colors duration-100 delay-150" href="#">О нас</a>
                        <a className="hover:text-[#000] transition-colors duration-100 delay-150" href="#">Контакты</a>
                        <p>Адрес: г. Казань, ул. Кремлевская, д. 35</p>
                        <p>Режим работы: Пн–Вс, 10:00–20:00</p>
                    </div>
                    <div className="flex flex-col">
                        <a className="hover:text-[#000] transition-colors duration-100 delay-150" href="#">Гарантия и возврат</a>
                        <a className="hover:text-[#000] transition-colors duration-100 delay-150" href="#">Часто задаваемые вопросы (FAQ)</a>
                        <a className="hover:text-[#000] transition-colors duration-100 delay-150" href="#">Проверка статуса заказа</a>
                    </div>
                    <div className="flex flex-col">
                        <a className="hover:text-[#000] transition-colors duration-100 delay-150" href="#">Политика конфиденциальности</a>
                        <a className="hover:text-[#000] transition-colors duration-100 delay-150" href="#">Пользовательское соглашение</a>
                        <a className="hover:text-[#000] transition-colors duration-100 delay-150" href="#">Публичная оферта</a>
                    </div>
                    <div className="flex flex-col">
                        <p>Телефон: +7 (XXX) XXX-XX-XX</p>
                        <p>Email: info@istore.ru</p>
                        <p>Telegram</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;