import {app} from './app.js'
import {connectDatabase} from './Dbconnect/DB.js'

connectDatabase()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log("server is started on port : ", process.env.PORT || 8000)
    })
}).catch((error)=>{
    console.log("error of database" , error)
})