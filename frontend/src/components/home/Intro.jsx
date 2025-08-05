import React from 'react';
import photoSrc from '../../assets/intro__photo.png'

const Intro = () => {
    return (
        <div className="bg-[#D9D9D9] w-full">
            <div className="mx-auto max-w-[1350px] w-full relative min-h-screen px-4 sm:px-6 md:px-[40px] 2xl:px-0 flex items-center justify-center lg:justify-normal">
                <div className="flex flex-wrap justify-center lg:justify-between">
                    <div className="text-center lg:text-left">
                        <div>
                            <h2 className="montserrat-800 text-[38px] sm:text-[48px] lg:text-[52px] xl:text-[64px] font-bold slide-up"> Ваша техника.</h2>
                            <h2 className="montserrat-800 text-[38px] sm:text-[48px] lg:text-[52px] xl:text-[64px] font-bold slide-up slide-up-delay-1">Ваш стиль.</h2>
                            <h2 className="montserrat-800 text-[38px] sm:text-[48px] lg:text-[52px] xl:text-[64px] font-bold slide-up slide-up-delay-2">Ваша Apple.</h2>
                        </div>
                        <p className="inter-300 opacity-70 text-gray-700 mt-[45px] text-[18px] lg:text-[16px]  xl:text-[18px] leading-[1.4]">
                            iStore — магазин, где Apple начинается с доверия. <br/>
                            Доставим за 24 часа. Только оригинал.</p>
                    </div>
                    <div className="hidden lg:block absolute bottom-[0] right-[0] pr-[20px] w-full max-w-[440px] 2xl:pr-0 2xl:max-w-[480px] ">
                        <img src={photoSrc} alt="iPhone на фоне — стиль Apple"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;