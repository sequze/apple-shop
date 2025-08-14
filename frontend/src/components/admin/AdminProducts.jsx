import React, {useState} from 'react';
import GreyButton from "../ui/greyButton/greyButton.jsx";
import ProductInfoStep from "./product/ProductInfoStep.jsx";
import ImageUploadStep from "./product/ImageUploadStep.jsx";

const AdminProducts = () => {

    const [step, setStep] = useState(0);
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        colorsCount: 1,
        image: null,
        discount: {
            percent: 0,
            startDate: "",
            endDate: "",
            description: ""
        }
    });

    const initialProductState = {
        name: "",
        description: "",
        price: "",
        category: "",
        colorsCount: 1,
        image: null,
        discount: {
            percent: 0,
            startDate: "",
            endDate: "",
            description: ""
        }
    };

    const handleCancel = () => setProduct(initialProductState);

    return (
        <form>
            <h2 className="text-[24px] sm:text-[28px] inter-400 mb-[20px] lg:mb-[40px] mt-[20px]">Продукт</h2>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[20px]">
                <div className="relative w-full lg:w-1/2">
                    {step === 0 && (
                        <div className="w-full lg:w-3/12">
                            <GreyButton onClick={(e) => {
                                e.preventDefault();
                                setStep(1);
                            }}>
                                Добавить
                            </GreyButton>
                        </div>
                    )
                    }
                    {step === 1 && (
                        <ProductInfoStep handleCancel={handleCancel} setStep={setStep} product={product} setProduct={setProduct}/>
                    )}
                    {step === 2 && (
                        <ImageUploadStep product={product} setProduct={setProduct} setStep={setStep} handleCancel={handleCancel}/>
                    )
                    }
                    {step === 3 && (
                        <ProductInfoStep />
                    )}

                </div>
            </div>
        </form>
    );
};

export default AdminProducts;