import { forwardRef, useId } from 'react'
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { authProps } from '../pages/Sign_in';


interface inpuutProps {
    type: string,
    label: string,
    className?: string,
    name: keyof authProps,
    placeholder: string,
    control: Control<authProps>
}

const Input = ({ type = 'text', label, placeholder, className, name, control, ...props }: inpuutProps, ref) => {
    const id = useId();
    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required: `${name} is required`,
                ...(name === 'email' ? { pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" } } : {}),
                ...(name === 'password' ? { minLength: { value: 4, message: "Password must be at least 8 characters" } } : {})
            }}
            render={({ field, fieldState: { error } }) => (
                <div className={`w-full `} >
                    {label && <label className='inline-block mb-1 pt-1 font-bold' htmlFor={id}>
                        {label}
                    </label>
                    }
                    <input className={`px-3 py-1.5 ${className} rounded-lg bg-white text-black outline-none focus:bg-gray-100
                    duration-200 border border-gray-200 w-full `}
                        {...props}
                        {...field}
                        ref={ref}
                        id={id}
                        type={type}
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                </div>
            )}
        />
    )
}

export default forwardRef(Input)