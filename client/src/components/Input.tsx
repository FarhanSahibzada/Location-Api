import { forwardRef, useId } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { JSX } from 'react/jsx-runtime';


interface inputProps<T extends FieldValues> {
    type?: string,
    label: string,
    className?: string,
    name: Path<T>,
    placeholder: string,
    control: Control<T>
}

const InputInner = <T extends FieldValues>(
    { type = 'text', label, placeholder, className, name, control, ...props }: inputProps<T>,
    ref: React.Ref<HTMLInputElement>
) => {
    const id = useId();
    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required: `${name as string} is required`,
                ...(name === 'email' ? { pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" } } : {}),
                ...(name === 'password' ? { minLength: { value: 4, message: "Password must be at least 8 characters" } } : {})
            }}
            render={({ field, fieldState: { error } }) => (
                <div className={`w-full `} >
                    {label && <label className='inline-block mb-1 pt-1 font-bold' htmlFor={id}>
                        {label}
                    </label>
                    }
                    <input
                        {...props}
                        {...field}
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        className={`px-3 py-1.5 ${className} rounded-lg bg-white text-black outline-none focus:bg-gray-100
                    duration-200 border border-gray-200 w-full `}
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                </div>
            )}
        />
    )
}


const Input = forwardRef(InputInner) as <T extends FieldValues>(
    props: inputProps<T> & { ref: React.Ref<HTMLInputElement> }
) => JSX.Element

export default Input