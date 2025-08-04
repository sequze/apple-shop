import React from 'react';

const ContactContent = () => {
    return (
        <>
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

        </>
    );
};

export default ContactContent;