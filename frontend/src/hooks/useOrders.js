import {useEffect, useState} from "react";
import UsersService from "../components/api/service/UsersService.js";


export const useOrders = (page, size) => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasMore, setHasMore] = useState(true);


    useEffect(() => {
        setIsLoading(true);
        UsersService.getUserOrders(page, size)
            .then(res => {
                setOrders(prev => [...prev, ...res]);
                setHasMore(res.length === size);
            })
            .catch(err => {
                setError(err);
                setHasMore(false);
            })
            .finally(() =>
                setIsLoading(false)
            );
    }, [page, size]);

    return { orders, isLoading, error, hasMore };
}