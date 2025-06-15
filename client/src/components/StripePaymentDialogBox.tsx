import React, { SetStateAction, useState } from 'react'
import DialogBox from './DialogBox'
import StripePaymentComponent from './StripePaymentComponent';

 export interface PaymentDialogBoxHandlerProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
}

function StripePaymentDialogBox({isDialogOpen , setIsDialogOpen} : PaymentDialogBoxHandlerProps ) {

    return (
        <DialogBox
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            title='Card Information'
            description='please fill the details'
            children={
                <StripePaymentComponent
                    setIsDialogOpen={setIsDialogOpen}
                />
            }
        />
    )
}

export default StripePaymentDialogBox