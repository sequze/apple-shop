import { createContext, useEffect, useState } from "react";
import CartService from "../components/api/service/CartService.js";

export const CartContext = createContext({
    cartItems: [],
    setCartItems: () => {},
    isLoading: false,
    refreshCart: () => {} // Добавляем функцию обновления
});

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const refreshCart = async () => {
        try {
            setIsLoading(true);
            const resp = await CartService.getCartItems();
            setCartItems(resp || []);
        } catch (err) {
            console.error("Ошибка обновления корзины:", err);
            setCartItems([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshCart();
    }, []);

    return (
        <CartContext.Provider value={{
            cartItems,
            setCartItems,
            isLoading,
            refreshCart
        }}>
            {children}
        </CartContext.Provider>
    );
};