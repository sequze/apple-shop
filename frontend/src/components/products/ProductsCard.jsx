import React from 'react';
import {Link} from "react-router-dom";

const ProductsCard = ({products}) => {
    return (
        <div className="flex flex-wrap gap-[15px] justify-between">
            {products.map(product => (
                <Link
                    key={product.description}
                    to={`./${product.description
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)+/g, "")}`}>
                    <div className="flex flex-col bg-[#fff] rounded-[25px] p-[25px] gap-[15px]">
                        <div className="min-h-[250px] min-w-[280px]">
                            <img className="max-w-[300px] w-full mx-auto" src={product.img} alt={product.type}/>
                        </div>
                        <p className="text-[18px]">{product.description}</p>
                        <p className="text-[22px] opacity-80">{product.price}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProductsCard;