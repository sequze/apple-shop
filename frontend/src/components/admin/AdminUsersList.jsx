import React, {useEffect, useState} from 'react';
import UsersService from "../api/service/UsersService.js";
import UserImgPlaceholder from "../../assets/user_logo.png";

const AdminUsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsersList = async () => {
            try {
                const data = await UsersService.getUsers();
                setUsers(data);
            } catch (err) {
                console.error(err);
            }
        }
        getUsersList();
    }, []);

    return (
        <div>
            <h2 className="text-[24px] sm:text-[28px] inter-400 mb-[20px] lg:mb-[40px] mt-[20px]">Пользователи</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {users && users.map(user => (
                    <div key={user.id}
                         className="p-4 rounded-2xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition">
                        <div className="flex items-center gap-4">
                            <img
                                src={user.profile_image_url || UserImgPlaceholder}
                                alt={user.full_name}
                                className="w-14 h-14 rounded-full object-cover border"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">{user.full_name || "Без имени"}</h3>
                                <p className="text-gray-500 text-sm">{user.email}</p>
                            </div>
                        </div>

                        <div className="mt-3 flex flex-col gap-2">
                            <select
                                className="border rounded-lg px-2 py-1 text-sm"
                                defaultValue={user.is_superuser ? "admin" : "user"}
                            >
                                <option value="user">Пользователь</option>
                                <option value="admin">Админ</option>
                            </select>

                            <select
                                className="border rounded-lg px-2 py-1 text-sm"
                                defaultValue={user.is_active ? "active" : "inactive"}
                            >
                                <option value="active">Активен</option>
                                <option value="inactive">Неактивен</option>
                            </select>
                        </div>

                        <p className="text-xs text-gray-400 mt-2">
                            Зарегистрирован: {new Date(user.created_at).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminUsersList;
