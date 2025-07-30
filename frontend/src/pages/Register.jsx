import React, {useState} from 'react';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import MyInput from "../components/ui/input/MyInput.jsx";
import MyWhiteButton from "../components/ui/whiteButton/MyWhiteButton.jsx";
import {Link} from "react-router-dom";


const Register = ({logo}) => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    return (
        <div>
            <Header logo={logo}/>
            <div className="h-[100vh] bg-[#D9D9D9]">
                <div className="mx-auto max-w-[1500px] w-full py-[200px]">
                    <div className="flex flex-col items-center bg-[#fff] rounded-[40px] py-[150px]">
                        <h1 className="montserrat-400 text-[36px]">Регистрация</h1>
                        <div className="w-1/3 my-[75px] grid gap-[30px]">
                            <MyInput
                                placeholder="Логин"
                                type="text"
                                value={login}
                                onChange={(event) => setLogin(event.target.value)}
                            />
                            <MyInput
                                placeholder="Пароль"
                                type="text"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <MyInput
                                placeholder="Повторите пароль"
                                type="text"
                                value={passwordCheck}
                                onChange={(event) => setPasswordCheck(event.target.value)}
                            />
                        </div>
                        <MyWhiteButton >Зарегестрироваться</MyWhiteButton>
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