import React, {useEffect, useRef, useState} from 'react';
import MyInput from "../ui/input/MyInput.jsx";
import MyWhiteButton from "../ui/whiteButton/MyWhiteButton.jsx";
import GreyButton from "../ui/greyButton/greyButton.jsx";
import AuthService from "../api/AuthService.js";
import cameraImg from "../../assets/camera.png"
import userImg from "../../assets/user_logo.PNG";
import UsersService from "../api/UsersService.js";
import Loader from "../Loader.jsx";

const DataProfile = ({user, logout}) => {
    const [isChangeData, setIsChangeData] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const fileInput = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [localUser, setLocalUser] = useState(user);

    useEffect(() => {
        setLocalUser(user);
    }, [user]);


    const handleUpdateData = (event) => {
        event.preventDefault();

        setError("");

        if (!email.trim()) {
            setError("Логин обязателен");
            return;
        }

        if (!name.trim()) {
            setError("Имя обязательно");
            return;
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setError("Некорректный email");
            return;
        }

        try {
            AuthService.updateUserData({ email, name });
            setIsChangeData(false);
            setError("")
        } catch (err) {
            console.error(err);
        }
    }

    const handleUpdatePassword = async (event) => {
        event.preventDefault();

        if (oldPassword.length < 6 || newPassword.length < 6) {
            setError("Пароль должен быть минимум 6 символов");
            return;
        }

        if (!oldPassword.trim() || !newPassword.trim()) {
            setError("Напишите пароль");
            return;
        }

        try {
            await AuthService.changePassword(oldPassword, newPassword)
            setIsChangePassword(false);
            setError("")
        } catch (err) {
            if (err.status === 409) {
                setError("Старый пароль неверный");
            } else {
                setError("Ошибка при смене пароля");
            }
            console.error(err);
        }
    }

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            setIsLoading(true)
            await UsersService.uploadUserImage(formData);
            const updateUserResponse = await AuthService.getCurrentUser();
            setLocalUser(updateUserResponse.data);
            console.log("Фото успешно загружено");
        } catch (err) {
            console.error("Ошибка загрузки: ", err);
        } finally {
            setIsLoading(false);
        }
    }

    if (isChangeData) {
        return (
            <>
                <form className="flex flex-col justify-center gap-[20px] w-full lg:w-1/2 mb-[20px]"
                 onSubmit={handleUpdateData}>
                    <MyInput placeholder="Имя..."
                    onChange={(event) => setName(event.target.value)}
                    />
                    <MyInput placeholder="Почта..."
                    onChange={(event) => setEmail(event.target.value)}
                    />
                    {error ? <div>{error}</div> : ""}
                    <MyWhiteButton type="submit">Изменить</MyWhiteButton>
                    <GreyButton style={{borderRadius: "20px", padding: "15px 0"}}
                                onClick={() => setIsChangeData(false)}>Отменить</GreyButton>
                </form>

            </>
        )
    } else if (isChangePassword) {
        return (
            <>
                <form className="flex flex-col justify-center gap-[20px] w-full lg:w-1/2 mb-[20px]"
                      onSubmit={handleUpdatePassword}>
                    <MyInput placeholder="Старый пароль..."
                             onChange={(event) => setOldPassword(event.target.value)}
                    />
                    <MyInput placeholder="Новый пароль..."
                             onChange={(event) => setNewPassword(event.target.value)}
                    />
                    {error ? <div>{error}</div> : ""}
                    <MyWhiteButton type="submit">Изменить</MyWhiteButton>
                    <GreyButton style={{borderRadius: "20px", padding: "15px 0"}} onClick={() => setIsChangePassword(false)}>Отменить</GreyButton>
                </form>

            </>
        )
    } else {
        return (
            <div className="flex items-center gap-[50px] md:gap-[100px] mb-[80px]">
                {isLoading
                    ?
                    <div className="w-[100px] h-[100px] sm:w-[150px] md:w-[200px] sm:h-[150px] md:h-[200px] flex items-center justify-center">
                        <Loader />
                    </div>
                    :
                    <div className="relative bg-[#D9D9D9] w-[100px] h-[100px] sm:w-[150px] md:w-[200px] sm:h-[150px] md:h-[200px] rounded-full overflow-hidden">
                        <input type="file"
                               accept="image/*"
                               className="w-full h-full absolute top-0 left-0"
                               style={{display:'none'}}
                               ref={fileInput}
                               onChange={handleFile} />
                        <div
                            className="transition-all duration-200 absolute top-0 left-0 w-full h-full opacity-[0] hover:opacity-[0.6] flex justify-center items-center bg-[#D9D9D9] cursor-pointer"
                            onClick={() => fileInput.current.click()}
                        >
                            <img
                                className="w-2/3 h-2/3"
                                src={cameraImg}
                                alt="Поставить аватар"/>
                        </div>

                        <img
                            className="w-full h-full object-cover"
                            src={localUser.profile_image_url || userImg} alt=""/>
                    </div>
                }
                <div>
                    <div className="montserrat-400 text-[28px] md:text-[36px] mb-[10px]">{user.full_name}</div>
                    <div
                        className="montserrat-400 text-[12px] sm:text-[14px] text-[#0171E2] hover:underline cursor-pointer mb-[10px]"
                        onClick={() => setIsChangeData(true)}>Изменить профиль</div>
                    <div
                        className="montserrat-400 text-[12px] sm:text-[14px] text-[#0171E2] hover:underline cursor-pointer mb-[10px]"
                        onClick={() => setIsChangePassword(true)}>Изменить пароль</div>
                    <div className="montserrat-400 text-[12px] sm:text-[14px] text-red-500 hover:underline cursor-pointer" onClick={logout}>Выйти</div>
                </div>
            </div>
        );
    }

};

export default DataProfile;