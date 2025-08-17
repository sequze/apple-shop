import React, {useContext} from 'react';
import {CategoriesContext} from "../../../context/CategoriesContext.jsx";

const ListCategories = ({handleDelete, handleEdit}) => {

    const {categories} = useContext(CategoriesContext);

    return (
        <div>
            <div className="inter-400 text-[18px] py-[20px]">Список всех категорий</div>
            <div className="flex flex-wrap justify-center gap-6">
                {categories.map(category => (
                    <div
                        key={category.id}
                        className="flex items-center gap-5 mb-3 border-2 p-4 rounded-2xl">
                        <div>
                            <img
                                className="w-full sm:w-[120px] h-[120px] object-cover rounded-lg"
                                src={category.image_url}
                                alt={category.name}
                            />
                        </div>
                        <div>
                            <h3 className="text-[18px]">{category.name}</h3>
                            <div className="flex gap-3 mt-3">
                                <button
                                    onClick={(event) => {
                                        event.preventDefault();
                                        handleEdit(category);
                                    }}
                                    className="px-3 py-1 rounded-full bg-blue-500 text-white text-sm hover:bg-blue-600"
                                >
                                    Редактировать
                                </button>
                                <button
                                    onClick={(event) => {
                                        event.preventDefault();
                                        handleDelete(category.id);
                                    }}
                                    className="px-3 py-1 rounded-full bg-red-500 text-white text-sm hover:bg-red-600"
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default ListCategories;