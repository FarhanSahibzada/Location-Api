import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Contact, EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserRound } from 'lucide-react'
import Input from '../components/Input'
import { data, Link } from 'react-router-dom'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import authServices from '../firebase/authFun'
import { useDispatch } from 'react-redux'
import { login } from '../Store/AuthSlice'

export interface authProps {
    name: string,
    email: string,
    password: string,
}

// const registerData = async (data: authProps) => {
//     const response = await axios.post(`${import.meta?.env.VITE_BACKEND_URL}/register`, data);
//     return response.data;
// }

export default function Sign_in() {

    const { control, handleSubmit } = useForm<authProps>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loading, setloading] = useState<boolean>(false)
    const ref = useRef(null)
    const dispatch = useDispatch();

    const mutationFun = useMutation({
        mutationFn: async (data: authProps) => {
            return authServices.createAccount({
                name: data.name,
                email: data.email,
                password: data.password
            });
        },
        onSuccess: (data) => {
            console.log("success", data)
            dispatch(login(data))
        },
        onError: (error) => {
            console.log("Error when send the request", error)
            alert("some went wrong")
        }
    })

    return (
        <div className='w-full h-[100vh] p-4  md:p-0  flex items-center justify-center 
        bg-gradient-to-br  from-blue-200 via-white to-gray-200 '>
            <div className="shadow-2xl p-4 rounded-xl bg-white">
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Create your account</h2>
                    <p className="mt-2 text-sm text-gray-600">Join us and start your journey</p>
                </div>
                <div className="mx-auto w-16 h-16 hover:bg-slate-100 rounded-full bg-primary/10 flex items-center
                 justify-center cursor-pointer">
                    <UserRound className="h-12 w-12 text-primary" />
                </div>
                {/* Form Start */}
                <form onSubmit={handleSubmit((data) => mutationFun.mutate(data))} className="space-y-4">
                    <div className='relative'>
                        <Contact className="absolute left-3 top-1/2 transform -translate-y-[-37%] text-gray-400" size={20} />
                        <Input<authProps>
                            ref={ref}
                            type="text"
                            label="Full name"
                            name='name'
                            control={control}
                            className="pl-10 focus:ring-primary rounded-lg shadow-md"
                            placeholder="Full name"
                        />
                    </div>

                    <div className="relative">
                        <MailIcon className="absolute left-3 top-1/2 transform -translate-y-[-40%] text-gray-400" size={20} />
                        <Input<authProps>
                            ref={ref}
                            type="email"
                            label="Email address"
                            control={control}
                            name='email'
                            className="pl-10 focus:ring-primary rounded-lg shadow-md"
                            placeholder="Email address"
                        />
                    </div>
                    <div className="relative">
                        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-[-40%] text-gray-400" size={20} />
                        <Input<authProps>
                            ref={ref}
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            name='password'
                            control={control}
                            className="pl-10 pr-10 focus:ring-primary rounded-lg shadow-md"
                            placeholder="Password"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-[-40%] text-gray-400"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                        </button>
                    </div>
                    <div>
                        <button
                            // Children='Signup'
                            type="submit"
                            className="w-full flex bg-blue-600 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 ease-in-out transform hover:scale-105"
                        >
                            {loading ? (
                                <div className="flex space-x-3 py-1 ">
                                    <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                                    <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-100"></div>
                                    <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
                                </div>

                            ) : 'Signup'}
                        </button>

                    </div>
                </form>

                <p className="text-center text-base py-4 text-gray-600">
                    Already have an account?{' '}
                    <Link to={"/Login"} className="font-medium text-blue-600 text-primary hover:text-primary/80 transition-colors">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}
