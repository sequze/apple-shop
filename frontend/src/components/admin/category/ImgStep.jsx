import React, {useRef} from 'react';
import cameraImg from "../../assets/camera.png";
import categoryImgPlaceHolder from "../../assets/img.svg";
import MyWhiteButton from "../../ui/whiteButton/MyWhiteButton.jsx";
import GreyButton from "../../ui/greyButton/greyButton.jsx";

const ImgStep = ({handleCancel, categoryImageFile, setCategoryImageFile, setIsDiscount}) => {

    const fileInput = useRef();

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) setCategoryImageFile(file);
    };

    const handleContinueDiscount = (e) => {
        e.preventDefault()
        if (!categoryImageFile) {
            alert("Загрузите изображение для категории");
            return;
        }
        setIsDiscount(true)
    }


    return (
        <div>
            <h3 className="inter-400 text-[18px] mb-[20px]">Изображение для категории</h3>
            <div className="relative bg-[#D9D9D9] w-[100px] h-[100px] sm:w-[150px] md:w-[200px] sm:h-[150px] md:h-[200px] overflow-hidden">
                <input type="file"
                       accept="image/*"
                       className="w-full h-full absolute top-0 left-0"
                       style={{display:'none'}}
                       ref={fileInput}
                       onChange={handleFile}
                />
                <div
                    className="transition-all duration-200 absolute top-0 left-0 w-full h-full opacity-[0] hover:opacity-[0.6] flex justify-center items-center bg-[#D9D9D9] cursor-pointer"
                    onClick={() => fileInput.current.click()}
                >
                    <img
                        className="w-2/3 h-2/3"
                        src={cameraImg}
                        alt="Поставить изображение для категории"/>
                </div>

                <img
                    className="w-full h-full object-cover"
                    src={categoryImgPlaceHolder} alt=""/>
            </div>
            {categoryImageFile && <div className="text-green-500">Изображение успешно загружено</div>}
            <div className="grid gap-3 mt-[20px]">
                <MyWhiteButton onClick={handleContinueDiscount}>Продолжить</MyWhiteButton>
                <GreyButton onClick={handleCancel}>Отмена</GreyButton>
            </div>
        </div>
    );
};

export default ImgStep;