import React, {useEffect, useState} from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import AuthService from "../components/api/AuthService.js";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader.jsx";

const Profile = ({logo}) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout(navigate)
    }

    const [user, setUser] = useState(null);
    console.log(user);

    useEffect(() => {
        const token = localStorage.getItem("access");

        AuthService.getCurrentUser()
            .then(res => setUser(res.data))
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (!user) return <Loader />

    return (
        <div>
            <Header logo={logo}/>
            <div className="bg-[#D9D9D9]">
                <div className="mx-auto max-w-[1500px] w-full relative  pt-[100px] pb-[100px] min-h-[100vh]">
                    <h2 className="ml-[25px] text-[36px] montserrat-300 mt-[30px] mb-[40px]">Профиль</h2>
                    <div>
                        <div className="bg-[#fff] rounded-[25px] mr-[50px] p-[25px] min-w-[350px] w-full shadow-md">
                            <div className="w-3/4 m-auto py-[35px]">
                                <div className="flex items-center gap-[100px] mb-[80px]">
                                    <div>
                                        <div className="bg-[#D9D9D9] w-[200px] h-[200px] rounded-full"/>
                                    </div>
                                    <div>
                                        <div className="montserrat-400 text-[36px] mb-[10px]">{user.full_name}</div>
                                        <div className="montserrat-400 text-[#0171E2] hover:underline cursor-pointer mb-[10px]">Изменить профиль</div>
                                        <div className="montserrat-400 text-red-500 hover:underline cursor-pointer" onClick={handleLogout}>Выйти</div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="montserrat-400 text-[32px]">Список заказов</h3>
                                    <div className="flex flex-col pt-[40px]">
                                        <div className="flex items-center gap-[35px]">
                                            <div className="bg-[#D9D9D9] w-[60px] h-[60px]" />
                                            <div className="inter-300 text-[22px]">Macbook Air 13-inch</div>
                                            <div className="inter-300 text-[18px] text-red-500" >В доставке</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col pt-[40px]">
                                        <div className="flex items-center gap-[35px]">
                                            <div className="bg-[#D9D9D9] w-[60px] h-[60px]" />
                                            <div className="inter-300 text-[22px]">Macbook Air 13-inch</div>
                                            <div className="inter-300 text-[18px] text-red-500" >В доставке</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col pt-[40px]">
                                        <div className="flex items-center gap-[35px]">
                                            <div className="bg-[#D9D9D9] w-[60px] h-[60px]" />
                                            <div className="inter-300 text-[22px]">Macbook Air 13-inch</div>
                                            <div className="inter-300 text-[18px] text-red-500" >В доставке</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;