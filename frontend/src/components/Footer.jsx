import React, {useState} from 'react';
import MyModal from "./ui/modal/MyModal.jsx";

const Footer = () => {

    const [guarantee, setGuarantee] = useState(false);
    const [faq, setFaq] = useState(false);
    const [confidential, setConfidential] = useState(false);
    const [agree, setAgree] = useState(false);


    return (
        <div className="h-[350px]">
            <div className="mx-auto max-w-[1500px] w-full">
                <div className="flex justify-between pt-[100px] leading-[1.4] text-[#000]/60">
                    <div className="flex flex-col">
                        <p>Адрес: г. Казань, ул. Кремлевская, д. 35</p>
                        <p>Режим работы: Пн–Вс, 10:00–20:00</p>
                    </div>
                    <div className="flex flex-col">
                        <a className="hover:text-[#000] transition-colors duration-100 delay-150 cursor-pointer" onClick={() => setGuarantee(true)}>Гарантия и возврат</a>
                        <a className="hover:text-[#000] transition-colors duration-100 delay-150 cursor-pointer" onClick={() => setFaq(true)}>Часто задаваемые вопросы (FAQ)</a>
                    </div>
                    <div className="flex flex-col">
                        <a className="hover:text-[#000] transition-colors duration-100 delay-150 cursor-pointer" onClick={() => setConfidential(true)}>Политика конфиденциальности</a>
                        <a className="hover:text-[#000] transition-colors duration-100 delay-150 cursor-pointer" onClick={() => setAgree(true)}>Пользовательское соглашение</a>
                    </div>
                    <div className="flex flex-col">
                        <p>Телефон: +7 (XXX) XXX-XX-XX</p>
                        <p>Email: info@istore.ru</p>
                        <p>Telegram</p>
                    </div>
                </div>
            </div>
            <MyModal visible={guarantee} setVisible={setGuarantee}>
                <h2 className="text-[24px] inter-600 mb-[10px]">Гарантия возврата</h2>
                <p>
                    Мы уверены в качестве нашей продукции и хотим, чтобы вы были полностью довольны своей покупкой. Если по какой-либо причине вы остались недовольны товаром, мы предлагаем гарантию возврата средств в течение 14 дней с момента получения заказа.
                </p>
                <h3 className="text-[18px] inter-600 my-[10px]">
                    Условия возврата:
                </h3>
                <ul className="list-disc grid gap-y-2 mb-[20px]">
                    <li>Товар не был в использовании и сохранён в оригинальном виде: без повреждений, с упаковкой, бирками и комплектующими.</li>
                    <li>Возврат осуществляется на основании чека или другого подтверждения покупки.</li>
                    <li>Некоторые категории товаров (например, товары личной гигиены, программное обеспечение и т.п.) возврату не подлежат согласно закону.</li>
                </ul>
                <h3 className="text-[18px] inter-600 my-[10px]">
                    Как оформить возврат:
                </h3>
                <ol className="list-decimal grid gap-y-2 ">
                    <li>Напишите нам на [email@example.com] или в Telegram: [@support_bot]</li>
                    <li>Укажите номер заказа и причину возврата.</li>
                    <li>Мы отправим вам инструкцию по возврату товара.</li>
                    <li>После получения и проверки товара, мы вернём деньги на ваш счёт в течение 5 рабочих дней.</li>
                </ol>
            </MyModal>
            <MyModal visible={faq} setVisible={setFaq} >
                <h2 className="text-[24px] inter-600 mb-[10px]">Часто задаваемые вопросы (FAQ)</h2>
                <h3 className="text-[18px] inter-600 my-[10px]">1. Оригинальная ли техника?</h3>
                <p>
                    Да, мы продаём исключительно оригинальные устройства Apple, поступающие от официальных поставщиков. Каждое устройство проходит проверку перед отправкой.
                </p>
                <h3 className="text-[18px] inter-600 my-[10px]">2. Есть ли гарантия?</h3>
                <p>
                    Да, на всю продукцию распространяется официальная гарантия Apple — 1 год. Также возможна расширенная гарантия (AppleCare+) при оформлении.
                </p>
                <h3 className="text-[18px] inter-600 my-[10px]">3. Как оформить заказ?</h3>
                <p>
                    Выберите нужный товар, добавьте в корзину и перейдите к оформлению заказа. Укажите контактные данные, способ оплаты и доставки. Наш менеджер свяжется с вами для подтверждения.
                </p>
                <h3 className="text-[18px] inter-600 my-[10px]">4. Какие способы оплаты доступны?</h3>
                <p>Мы принимаем:</p>
                <ul className="list-disc grid gap-y-2 mb-[20px]">
                    <li>Банковские карты (Visa, MasterCard, Мир)</li>
                    <li>Онлайн-оплату через сайт</li>
                    <li>Наложенный платёж (в некоторых регионах)</li>
                    <li>Рассрочку или кредит через партнёрские банки</li>
                </ul>
                <h3 className="text-[18px] inter-600 my-[10px]">5. Доставка по России есть?</h3>
                <p>
                    Да, мы доставляем заказы по всей России. Доступна курьерская доставка, самовывоз в крупных городах и доставка через транспортные компании.
                </p>
                <h3 className="text-[18px] inter-600 my-[10px]">6. Можно ли вернуть товар?</h3>
                <p>
                    Да, вы можете вернуть товар в течение 14 дней, если он не был в использовании и сохранён в товарном виде. Подробнее см. раздел «Гарантия возврата».
                </p>
                <h3 className="text-[18px] inter-600 my-[10px]">7. Поддерживаете ли вы Trade-In?</h3>
                <p>
                    Да, вы можете обменять своё старое устройство Apple на скидку при покупке нового. Оценка проводится онлайн или в точке самовывоза.
                </p>
                <h3 className="text-[18px] inter-600 my-[10px]">8. Продаёте ли восстановленные устройства?</h3>
                <p>
                    Да, у нас есть как новые, так и восстановленные (Refurbished) устройства с гарантией. Это официально восстановленная техника, прошедшая тестирование.
                </p>
            </MyModal>
            <MyModal visible={confidential} setVisible={setConfidential}>
                <h2 className="text-[24px] inter-600 mb-[10px]">Политика конфиденциальности</h2>
                <p>Мы уважаем вашу конфиденциальность и делаем всё возможное для защиты ваших данных. Ниже описано, как мы собираем и используем персональную информацию.</p>

                <h3 className="text-[18px] inter-600 my-[10px]">1. Какие данные мы собираем:</h3>
                <ul className="list-disc grid gap-y-2 mb-[20px]">
                    <li>Имя и фамилия</li>
                    <li>Контактный телефон</li>
                    <li>Электронная почта</li>
                    <li>Адрес доставки</li>
                    <li>История заказов и оплат</li>
                </ul>

                <h3 className="text-[18px] inter-600 my-[10px]">2. Как мы используем данные:</h3>
                <ul className="list-disc grid gap-y-2 mb-[20px]">
                    <li>Для оформления и доставки заказов</li>
                    <li>Для обратной связи и поддержки</li>
                    <li>Для отправки акций и новостей (только с вашего согласия)</li>
                </ul>

                <h3 className="text-[18px] inter-600 my-[10px]">3. Передача данных:</h3>
                <p>Мы не передаём ваши данные третьим лицам, кроме случаев, когда это необходимо для выполнения заказа (например, курьерская доставка) или предусмотрено законом.</p>

                <h3 className="text-[18px] inter-600 my-[10px]">4. Защита данных:</h3>
                <p>Мы используем HTTPS, шифрование и другие методы защиты. Доступ к информации строго ограничен.</p>

                <h3 className="text-[18px] inter-600 my-[10px]">5. Срок хранения:</h3>
                <p>Данные хранятся только столько, сколько необходимо для выполнения целей, или до вашего запроса на удаление.</p>

                <h3 className="text-[18px] inter-600 my-[10px]">6. Ваши права:</h3>
                <ul className="list-disc grid gap-y-2 mb-[20px]">
                    <li>Запросить доступ к данным</li>
                    <li>Изменить или удалить данные</li>
                    <li>Отозвать согласие на обработку</li>
                    <li>Отключиться от рассылок</li>
                </ul>

                <h3 className="text-[18px] inter-600 my-[10px]">7. Контакты:</h3>
                <p>По вопросам конфиденциальности обращайтесь на <strong>email@example.com</strong> или по телефону <strong>+7 (___) ___-__-__</strong></p>
            </MyModal>
            <MyModal visible={agree} setVisible={setAgree} >
                <h2 className="text-[24px] inter-600 mb-[10px]">Пользовательское соглашение</h2>
                <p>Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между владельцем сайта и пользователем в части использования сервиса, размещённого на домене вашего сайта.</p>

                <h3 className="text-[18px] inter-600 my-[10px]">1. Общие положения</h3>
                <ul className="list-disc grid gap-y-2 mb-[20px]">
                    <li>Пользователь, посещая сайт и/или совершая заказ, автоматически соглашается с условиями настоящего Соглашения.</li>
                    <li>Администрация сайта имеет право изменять условия Соглашения без предварительного уведомления.</li>
                </ul>

                <h3 className="text-[18px] inter-600 my-[10px]">2. Регистрация и персональные данные</h3>
                <ul className="list-disc grid gap-y-2 mb-[20px]">
                    <li>При оформлении заказа пользователь предоставляет достоверную информацию.</li>
                    <li>Персональные данные обрабатываются в соответствии с <a onClick={() => {
                        setAgree(false);
                        setConfidential(true);
                    }} className="underline text-blue-600 cursor-pointer">Политикой конфиденциальности</a>.</li>
                </ul>

                <h3 className="text-[18px] inter-600 my-[10px]">3. Обязательства пользователя</h3>
                <ul className="list-disc grid gap-y-2 mb-[20px]">
                    <li>Не использовать сайт для противоправной деятельности.</li>
                    <li>Не нарушать работу сайта и не предпринимать попыток взлома.</li>
                    <li>Соблюдать авторские права на материалы, размещённые на сайте.</li>
                </ul>

                <h3 className="text-[18px] inter-600 my-[10px]">4. Ответственность сторон</h3>
                <ul className="list-disc grid gap-y-2 mb-[20px]">
                    <li>Администрация сайта не несёт ответственности за ущерб, причинённый пользователю в результате неправильного использования сервиса.</li>
                    <li>Пользователь несёт ответственность за достоверность предоставляемых данных и соблюдение законодательства.</li>
                </ul>

                <h3 className="text-[18px] inter-600 my-[10px]">5. Заключительные положения</h3>
                <p>Настоящее Соглашение вступает в силу с момента использования сайта и действует бессрочно. В случае несогласия с условиями пользователь обязан прекратить использование сайта.</p>

                <h3 className="text-[18px] inter-600 my-[10px]">6. Контактная информация</h3>
                <p>По всем вопросам обращайтесь по адресу: <strong>email@example.com</strong></p>
            </MyModal>
        </div>
    );
};

export default Footer;