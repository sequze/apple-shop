import {createContext, useEffect, useState} from "react";
import CartService from "../components/api/service/CartService.js";


export const CartContext = createContext({
    cartItems: [],
    setCartItems: () => {}
});


export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const resp = await CartService.getCartItems(); // дождаться ответа
                setCartItems(resp || []); // защитимся от null
            } catch (err) {
                console.error(err);
                setCartItems([]); // при ошибке оставляем пустую корзину
            }
        };

        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{
            cartItems,
            setCartItems
        }}>
            {children}
        </CartContext.Provider>
    )
}