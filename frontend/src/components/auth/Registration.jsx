import React, {useState} from 'react';
import MyWhiteButton from "../ui/whiteButton/MyWhiteButton.jsx";
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../api/AuthService.js";
import MyInput from "../ui/input/MyInput.jsx";

const Registration = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {

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

        if (!name.trim()) {
            setError("Имя обязательно");
            return;
        }

        if (password.length < 6) {
            setError("Пароль должен быть минимум 6 символов");
            return;
        }

        if (!passwordCheck.trim()) {
            setError("Повторите пароль");
            return;
        }

        if (password !== passwordCheck) {
            setError("Пароли не совпадают");
            return;
        }

        try {
            const res = await AuthService.register(email, password, name);
            console.log("Успешная регистрация", res);
            navigate("/login");
        } catch (err) {
            const detail = err.response?.data?.detail;

            if (Array.isArray(detail)) {
                const messages = detail.map(e => e.msg).join(" ");
                setError(messages);
            } else if (typeof detail === "string") {
                setError(detail);
            } else {
                setError("Ошибка регистрации");
            }
        }

    }


    return (
        <div className="min-h-screen bg-[#D9D9D9] flex justify-center  items-center">
            <div className="max-w-[1200px] w-full pt-[100px] pb-[50px] sm:py-[100px] lg:py-[150px] mx-[20px]">
                <div className="flex flex-col items-center bg-[#fff] rounded-[40px] py-[40px] sm:py-[80px] lg:py-[120px]">
                    <h1 className="montserrat-400 text-[28px] sm:text-[36px]">Регистрация</h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleRegister();
                        }}
                        className="w-10/12 sm:w-2/3 lg:w-1/3 my-[75px] grid gap-[30px]">
                        <MyInput
                            placeholder="Email"
                            type="text"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <MyInput
                            placeholder="Имя"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <MyInput
                            placeholder="Пароль"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <MyInput
                            placeholder="Повторите пароль"
                            type="password"
                            value={passwordCheck}
                            onChange={(event) => setPasswordCheck(event.target.value)}
                        />
                        {error && <div className="text-red-500">{error}</div>}
                        <div className="flex justify-center">
                            <MyWhiteButton type="submit">Зарегестрироваться</MyWhiteButton>
                        </div>
                    </form>
                    <Link to="/login">
                        <p className="inter-300 mt-[0] text-center sm:text-left sm:mt-[20px] cursor-pointer">Уже зарегестрированы? Войти</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Registration;