import { User } from '../Schema/user.modal.js';
import { asyncHandler } from '../utlis/asynchandler.js';
import { ApiError } from '../utlis/ErrorApi.js';
import { responseApi } from '../utlis/responseApi.js';


const register =  asyncHandler(async (req , res)=>{
    const {name , email , firebaseuid} = req.body; 

    if(
        [name , email , firebaseuid].some((value)=> value?.trim() == "")
    ){
        throw new ApiError(401 , "does't get the field values of the register");
    }

    const CheckingifUserAlreadExist = await User.findOne({
        $or :[
            {email},
            {firebaseuid}
        ]
    })
    
    if(CheckingifUserAlreadExist){
        throw new ApiError(401 , "user is already exist!");
    }

    const createUser = await User.create({
        name,
        email,
        firebaseuid
    });

      if (!createdbyuser) {
        throw new ApiError(500, "something went while registering the user");
    }
    
    return res.status(200).json(
        new responseApi(200 , "user is successfull created" )
    )

})


export {
    register
}
