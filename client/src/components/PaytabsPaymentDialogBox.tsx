import React, { useState } from 'react'
import DialogBox from './DialogBox'
import FormOfPayment from './FormOfPayment'
import { PaymentDialogBoxHandlerProps } from './StripePaymentDialogBox'


export default function PaytabsPaymentDialogBox({isDialogOpen , setIsDialogOpen} : PaymentDialogBoxHandlerProps) {

    return (
        <DialogBox
            title="Customer Information"
            description="Please fill the following Information"
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            children={
                <>
                    <FormOfPayment setIsDialogOpen={setIsDialogOpen} />
                </>
            }

        />
    )
}
