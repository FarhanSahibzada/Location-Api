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

      if (!createUser) {
        throw new ApiError(500, "something went while registering the user");
    }

    const userData = await User.findById(createUser._id);

    return res.status(200).json(
        new responseApi(200 , userData ,"user is successfull created" )
    )

})

const login =  asyncHandler(async ()=>{

    const {email}  = req.body;

    if(!email) {
        throw new ApiError(401 , "can not the email");
    }

    const finduser = await User.findOne({email});
    if(!finduser){
        throw new ApiError(404 , "can not find the user ");
    }

    return res.status(200).json(
        new responseApi(200 , finduser , "user is successfully finded")
    )

})

export {
    register,
    login
}
