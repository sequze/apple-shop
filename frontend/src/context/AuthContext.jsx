import {createContext, useEffect, useState} from "react";
import AuthService from "../components/api/service/AuthService.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const res = await AuthService.checkAuth();
                if (res) {
                    setIsAuth(true);

                    const { data } = await AuthService.getCurrentUser();
                    if (data.is_superuser) {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                } else {
                    setIsAuth(false);
                    setIsAdmin(false);
                }
            } catch (e) {
                setIsAuth(false);
                setIsAdmin(false);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuthStatus();
    }, []);

    return (<AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading,
            isAdmin,
            setIsAdmin
        }}>
            {children}
        </AuthContext.Provider>
    )
}

