import React from 'react';
import { Link } from "react-router-dom";

const ProductsCard = ({ products }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map(product => (
                <Link
                    key={product.description}
                    to={`./${product.id}`}
                    className="h-full"
                >
                    <div className="flex flex-col h-full bg-white rounded-[20px] p-[20px] sm:p-[25px] gap-[12px] transition-transform transform hover:-translate-y-1">
                        <div className="flex-1 flex items-center justify-center min-h-[200px]">
                            <img
                                className="max-h-[180px] w-auto object-contain"
                                src={product.img}
                                alt={product.type}
                            />
                        </div>
                        <p className="text-[16px] sm:text-[18px] line-clamp-2">{product.description}</p>
                        <p className="text-[20px] sm:text-[22px] opacity-80">{product.price}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProductsCard;
