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
import { toast, Toaster } from 'sonner'

export interface loginProps {
    email: string,
    password: string,
}


export default function Login_in() {
    const { control, handleSubmit } = useForm<loginProps>({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loading, setloading] = useState<boolean>(false)
    const useref = useRef(null)
    const dispatch = useDispatch();

    const mutationFun = useMutation({
        mutationFn: async (data: { provider: "email" | "google" | "github", payload?: loginProps }) => {
            if (data.provider == "email") {
                return authServices.loginAccount({ 
                    email: data.payload?.email as string,
                    password : data.payload?.password as string
                });
            }
            if (data.provider == "google") {
                return authServices.google_register();
            }
            if (data.provider == "github") {
                console.log("githiu")
            }
        },
        onSuccess: (data) => {
            dispatch(login(data))
            console.log("success", data)
        },
        onError: (error) => {
            console.log("Error when send the request", error)
            toast.error("something went wrong please try again")
        }
    })


    return (
        <>
            <Toaster position='top-center' />
            <div className='w-full h-[100vh]  flex items-center justify-center bg-slate-200 '>
                <div className=" shadow-2xl p-4 rounded-xl bg-white">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Login your account</h2>
                        <p className="mt-2 text-sm text-gray-600">Welcome Back</p>
                    </div>
                    <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserRound className="h-12 w-12 text-primary" />
                    </div>

                    <form onSubmit={handleSubmit((data) => mutationFun.mutate({ provider: "email", payload: data }))} className="space-y-8">
                        <div className="relative">
                            <MailIcon className="absolute left-3 top-1/2 transform -translate-y-[-40%] text-gray-400" size={20} />
                            <Input<loginProps>
                                ref={useref}
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
                            <Input<loginProps>
                                ref={useref}
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

                                ) : 'Login'}
                            </button>
                        </div>
                    </form>

                    {/* line */}
                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-neutral-400"></div>
                        <span className="mx-2 text-neutral-500">OR</span>
                        <div className="flex-grow border-t border-neutral-400"></div>
                    </div>
                    {/*  images */}
                    <div className='flex justify-center gap-4'>

                        <figure className='w-[4rem] hover:bg-slate-200 py-1.5 px-2 rounded-xl cursor-pointer'
                            onClick={() => mutationFun.mutate({ provider: "google" })}
                        >
                            <img src="/google logo.png" alt="image"
                                className='w-full h-full object-cover'
                            />
                        </figure>
                        <figure className='w-[4rem] hover:bg-slate-200 py-1.5 px-2 rounded-xl cursor-pointer'
                            onClick={() => mutationFun.mutate({ provider: "github" })}
                        >
                            <img src="/github logo.png" alt="image"
                                className='w-full h-full object-cover'
                            />
                        </figure>
                    </div>

                    <p className="text-center text-base py-4 text-gray-600">
                        Don't have any account?{' '}
                        <Link to={"/sign-in"} className="font-medium text-blue-600 text-primary hover:text-primary/80 transition-colors">
                            Sign-Up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
