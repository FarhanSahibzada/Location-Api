import { useForm } from 'react-hook-form'
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { SetStateAction } from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '../api/axios/index';

export interface FormData {
    name: string;
    email: string;
    phone: number;
    street: string;
    city: string;
    state: string;
    country: string;
    zip: number;
}

interface FormOfPaymentProps {
    setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>
}

function FormOfPayment({ setIsDialogOpen }: FormOfPaymentProps) {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

    const mutationFn = useMutation({
        mutationFn: async (data: FormData) => {
            console.log("backend url=",import.meta.env.VITE_BACKEND_URL)
            const response = await api.post(`${import.meta.env.VITE_BACKEND_URL}/payment/checkout`, data,    
        )
            return response.data.data;
        },
        onSuccess: (response) => {
            setIsDialogOpen(false);
            window.location.href = response.url;
        },
        onError: (err) => {
            console.error("error when the payment method is requested", err);
        }
    });


    return (
        <form onSubmit={handleSubmit((data) => mutationFn.mutate(data))} className="space-y-4 ">
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="Cnic">Phone Number</Label>
                <Input
                    id="Cnic"
                    type="number"
                    placeholder="Enter your PhonrNumber"
                    {...register("phone",
                        {
                            required: "phone Number is required",
                            minLength: {
                                value: 10,
                                message: "Minimum length must be 10 Numbers"
                            },
                            maxLength: {
                                value: 13,
                                message: "Maximum length must be 13 Numbers"
                            }
                        })}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Street</Label>
                <Input
                    id="phoneNumber"
                    type="text"
                    placeholder="Enter The Street Area"
                    {...register("street",
                        {
                            required: "street is required",

                        })}
                />
                {errors.street && <p className="text-red-500 text-sm">{errors.street.message}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="address">city</Label>
                <Input
                    id="address"
                    type="text"
                    placeholder="Enter your City Name"
                    {...register("city", { required: "City Name is required" })}
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Input
                    id="state"
                    type="text"
                    placeholder="Enter your State"
                    {...register("state", { required: "State is required" })}
                />
                {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input
                    id="country"
                    type="text"
                    placeholder="Enter your Country"
                    {...register("country", { required: "Country is required" })}
                />
                {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="zip code">Zip</Label>
                <Input
                    id="zip code"
                    type="text"
                    placeholder="Enter your Zip Code"
                    {...register("zip", { required: "Zip code  is required" })}
                />
                {errors.zip && <p className="text-red-500 text-sm">{errors.zip.message}</p>}
            </div>

            <div className="mt-20 flex justify-end">
                <Button type="submit" >Submit</Button>
            </div>
        </form>
    )
}

export default FormOfPayment