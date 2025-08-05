import React, {useState} from 'react';
import MyModal from "./ui/modal/MyModal.jsx";
import FooterContent from "./modals/FooterContent.jsx";
import GuaranteeContent from "./modals/GuaranteeContent.jsx";
import FaqContent from "./modals/FaqContent.jsx";
import ConfidentialContent from "./modals/ConfidentialContent.jsx";
import UserAgreement from "./modals/UserAgreement.jsx";

const Footer = () => {

    const [modalType, setModalType] = useState(null);

    const footerContents = [
        <>
            <p>Адрес: г. Казань, ул. Кремлевская, д. 35</p>
            <p>Режим работы: Пн–Вс, 10:00–20:00</p>
        </>,
        <>
            <button type="button" className="hover:text-[#000] transition-colors duration-100 delay-150 cursor-pointer" onClick={() => setModalType('guarantee')}>Гарантия и возврат</button>
            <button type="button"  className="hover:text-[#000] transition-colors duration-100 delay-150 cursor-pointer" onClick={() => setModalType('faq')}>Часто задаваемые вопросы (FAQ)</button>
        </>,
        <>
            <button type="button" className="hover:text-[#000] transition-colors duration-100 delay-150 cursor-pointer" onClick={() => setModalType('conf')}>Политика конфиденциальности</button>
            <button type="button" className="hover:text-[#000] transition-colors duration-100 delay-150 cursor-pointer" onClick={() => setModalType('agree')}>Пользовательское соглашение</button>
        </>,
        <>
            <p>Телефон: +7 (XXX) XXX-XX-XX</p>
            <p>Email: info@istore.ru</p>
            <p>Telegram</p>
        </>
    ]

    return (
        <div className="h-auto sm:h-[350px]">
            <div className="mx-auto max-w-[1500px] w-full">
                <div className="flex flex-col items-center sm:flex-row sm:justify-around md:justify-between py-[20px] sm:pt-[100px] flex-wrap leading-[1.4] text-[#000]/60 px-[20px] gap-3">
                    <FooterContent contents={footerContents} />
                </div>
            </div>
            <MyModal visible={modalType === 'guarantee'} setVisible={() => setModalType(null)}>
                <GuaranteeContent />
            </MyModal>
            <MyModal visible={modalType === 'faq'} setVisible={() => setModalType(null)}>
                <FaqContent />
            </MyModal>
            <MyModal visible={modalType === 'conf'} setVisible={() => setModalType(null)}>
                <ConfidentialContent />
            </MyModal>
            <MyModal visible={modalType === 'agree'} setVisible={() => setModalType(null)}>
                <UserAgreement />
            </MyModal>
        </div>
    );
};

export default Footer;