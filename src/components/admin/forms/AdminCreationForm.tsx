'use client';
import InputComboBox from "@/components/commons/ComboBox";
import { ADMIN_ROLES } from "@/lib/constants";
import { AdminUser } from "@prisma/client";
import { BaseSyntheticEvent } from "react";
import { Controller, useForm } from 'react-hook-form';

const AdminCreationForm = () => {
    const { register, handleSubmit, control } = useForm<AdminUser>();

    const createAdmin = (data: AdminUser, event: BaseSyntheticEvent<object, any, any> | undefined) => {
        if (event === undefined) return;
        event.preventDefault();
        console.log(data);
        // createAdminUser(data)
    }
    return (
        <form className="flex flex-col gap-4 w-full sm:w-1/2 sm:mt-16"
            onSubmit={handleSubmit(async (data, event) => createAdmin(data, event))}
        >
            <h1 className="text-xl text-center font-semibold text-gray-900 sm:text-2xl dark:text-white mb-4">
                Crear administrador
            </h1>
            <div className="">
                <label
                    htmlFor="studyArea"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Nombre Completo
                </label>
                <input type="text" required {...register('name')} />
            </div>
            <div className="">
                <label
                    htmlFor="currentAcademicPeriod"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Email{' '}
                </label>
                <input type="email" required {...register('email')} />
            </div>
            <div className="">
                <label
                    htmlFor="currentAcademicPeriod"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Rol{' '}
                </label>
                <Controller
                    name="role"
                    control={control}
                    rules={{
                        required: "Please select a user",
                    }}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <InputComboBox values={ADMIN_ROLES} />
                    )}
                />

            </div>
            <button
                className="text-white bg-primary-light hover:bg-primary-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
            >
                Crear administrador
            </button>
        </form>
    )
}

export default AdminCreationForm