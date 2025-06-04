

class responseApi {
    constructor (statusCode , data , message='success' , success=true){
        this.statusCode = statusCode;
        this.data = data;
        success = this.success;
        this.message = message;
    }
}


export {
    responseApi
}