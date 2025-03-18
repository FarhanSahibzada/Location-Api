import React, { useState } from 'react'
import {useForm } from 'react-hook-form'
import { Contact, EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserRound } from 'lucide-react'
import Input from '../components/Input'

export interface authProps {
    name : string,
    email : string,
    password :string,
}

export default function Sign_in() {
    const {register , control , handleSubmit} = useForm<authProps>()
    const [showPassword , setShowPassword] = useState<boolean>(false)

    const signup = async (data : authProps) => {
        console.log(data)
    }


  return (
    <div className="max-w-md w-full space-y-8">
    <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p className="mt-2 text-sm text-gray-600">Join us and start your journey</p>
    </div>

    <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
        <UserRound className="h-12 w-12 text-primary" />
    </div>
    
    <form onSubmit={handleSubmit(signup)} className="space-y-8">
        <div>
            <div className=' relative'>
                <Contact className="absolute left-3 top-1/2 transform -translate-y-[-37%] text-gray-400" size={20} />
                <Input
                    type="text"
                    label="Full name"
                    name='name'
                    control={control}
                    className=" pl-10 focus:ring-primary rounded-lg shadow-md"
                    placeholder="Full name"
                />
            </div>
        </div>
        <div>
            <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 transform -translate-y-[-40%] text-gray-400" size={20} />
                <Input
                    type="email"
                    label="Email address"
                    control={control}
                    name='email'
                    className="pl-10 focus:ring-primary rounded-lg shadow-md"
                    placeholder="Email address"
                />
            </div>
        </div>
        <div>
            <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-[-40%] text-gray-400" size={20} />
                <Input
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
        </div>
        <div>
            <button
                // Children='Signup'
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 ease-in-out transform hover:scale-105"
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
        <Link to={"/Login"} className="font-medium text-primary hover:text-primary/80 transition-colors">
            Login
        </Link> 
    </p>
</div>

</div> 
  )
}
