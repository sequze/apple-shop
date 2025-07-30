import React from 'react';

const Intro = (props) => {
    return (
        <div className="bg-[#D9D9D9]">
            <div className="mx-auto max-w-[1350px] w-full relative h-[100vh]">
                <div className="flex justify-between  pt-[300px]">
                    <div>
                        <div>
                            <h1 className="montserrat-800 text-[82px] font-bold slide-up">Ваша техника.</h1>
                            <h1 className="montserrat-800 text-[82px] font-bold slide-up slide-up-delay-1">Ваш стиль.</h1>
                            <h1 className="montserrat-800 text-[82px] font-bold slide-up slide-up-delay-2">Ваша Apple.</h1>
                        </div>
                        <p className="inter-300 opacity-70 text-gray-700 mt-[45px] text-[18px]/[1.4]">
                            iStore — магазин, где Apple начинается с доверия. <br/>
                            Доставим за 24 часа. Только оригинал.</p>
                    </div>
                    <div className="absolute bottom-[0] right-[0] w-full max-w-[480px]">
                        <img className="w-full" src={props.photo} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;