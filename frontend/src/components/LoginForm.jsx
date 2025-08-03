import React, {useState} from 'react';
import MyInput from "./ui/input/MyInput.jsx";
import MyWhiteButton from "./ui/whiteButton/MyWhiteButton.jsx";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import AuthService from "./api/AuthService.js";

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");

        if (!email.trim()) {
            setError("Логин обязателен");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Некорректный email");
            return;
        }

        if (!password.trim()) {
            setError("Пароль обязателен");
            return;
        }

        try {
            const {access_token} = await AuthService.login(email, password);
            localStorage.setItem("access", access_token);
            axios.defaults.headers.common.Authorization = "Bearer " + access_token;
            navigate("/");
        } catch (err) {
            const detail = err.response?.data?.detail;

            if (Array.isArray(detail)) {
                const messages = detail.map(e => e.msg).join(" ");
                setError(messages);
            } else if (typeof detail === "string") {
                setError(detail);
            } else {
                setError("Ошибка входа");
            }
        }
    }


    return (
        <div className="h-[100vh] bg-[#D9D9D9]">
            <div className="mx-auto max-w-[1500px] w-full py-[200px]">
                <div className="flex flex-col items-center bg-[#fff] rounded-[40px] py-[150px]">
                    <h1 className="montserrat-400 text-[36px]">Вход</h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}
                        className="w-1/3 my-[75px] grid gap-[30px]">
                        <MyInput
                            placeholder="Email"
                            type="text"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <MyInput
                            placeholder="Пароль"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {error && <div className="text-red-500">{error}</div>}
                        <div className="flex justify-center">
                            <MyWhiteButton type="submit">Войти</MyWhiteButton>
                        </div>
                    </form>

                    <Link to="/register">
                        <p className="inter-300 mt-[20px] cursor-pointer">Не зарегестрированы? Зарегестрироваться</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;