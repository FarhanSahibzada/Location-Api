import React, { SetStateAction, useState } from 'react';
import {
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
} from '@stripe/react-stripe-js';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import authServices from '../firebase/authFun';
import api from '../api/axios/index';

interface props {
  setIsDialogOpen : React.Dispatch<SetStateAction<boolean>>
}

export default  function StripePaymentComponent({setIsDialogOpen } : props) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [postalCode, setPostalCode] = useState('');
  const [Token, setToken] = useState<string | null>(null)
  const access_token =  authServices.getFreshToken()
  .then((token)=>{
   setToken(token)
  });

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const mutationFn = useMutation({
    mutationFn: async () => {
      if (!stripe || !elements) {
        throw new Error('Stripe has not loaded yet');
      }

      const cardNumberElement = elements.getElement(CardNumberElement);

      if (!cardNumberElement) {
        throw new Error('Card number element not found');
      }

      // Create token using the card number element
      const { token, error } = await stripe.createToken(cardNumberElement, {
        name: 'Customer Name', // You can make this dynamic
        address_zip: postalCode,
      });

      if (error) {
        console.log("Error when creating stripe token", error);
        if(error.message != undefined){
          setError(error.message);
        }
        throw error;
      }

      const data = {
        product_name: "testing",
        amount: 20,
        stripe_token: token
      };

      const response = await api.post(
        `${import.meta.env.VITE_BACKEND_URL}/payment/stripe-checkout`,
        {data},
      );

      return response.data;
    },
    onSuccess: (response) => {
      console.log("Transaction successful", response);
      setError(null);
      setIsDialogOpen(false)
    },
    onError: (error) => {
      console.log("Error when sending the request of stripe payment", error);
      setError(error.message || 'Payment failed');
      setIsDialogOpen(false)
    }
  });


  return (
    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      mutationFn.mutate();
    }} className="space-y-4">

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Number
        </label>
        <div className="border border-gray-300 p-3 rounded-md shadow-sm bg-white">
          <CardNumberElement options={cardElementOptions} />
        </div>
      </div>


      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date
          </label>
          <div className="border border-gray-300 p-3 rounded-md shadow-sm bg-white">
            <CardExpiryElement options={cardElementOptions} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CVC
          </label>
          <div className="border border-gray-300 p-3 rounded-md shadow-sm bg-white">
            <CardCvcElement options={cardElementOptions} />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Postal Code
        </label>
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="12345"
          className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>


      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || mutationFn.isPending}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {mutationFn.isPending ? "Processing..." : "Pay 20 SGD"}
      </button>
    </form>
  );
}