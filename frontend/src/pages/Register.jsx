import React, {useState} from 'react';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import MyInput from "../components/ui/input/MyInput.jsx";
import MyWhiteButton from "../components/ui/whiteButton/MyWhiteButton.jsx";
import {Link} from "react-router-dom";
import AuthService from "../components/api/AuthService.js";


const Register = ({logo}) => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        console.log(error)

        setError("");

        if (!email.trim()) {
            setError("Логин обязателен");
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
            setError("Успешно")
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
        <div>
            <Header logo={logo}/>
            <div className="h-[100vh] bg-[#D9D9D9]">
                <div className="mx-auto max-w-[1500px] w-full py-[150px]">
                    <div className="flex flex-col items-center bg-[#fff] rounded-[40px] py-[120px]">
                        <h1 className="montserrat-400 text-[36px]">Регистрация</h1>
                        <div className="w-1/3 my-[75px] grid gap-[30px]">
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
                        </div>
                        {error && <div className="text-red-500">{error}</div>}
                        <MyWhiteButton onClick={handleRegister}>Зарегестрироваться</MyWhiteButton>
                        <Link to="/login">
                            <p className="inter-300 mt-[20px] cursor-pointer hover:underline">Уже зарегестрированы? Войти</p>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;