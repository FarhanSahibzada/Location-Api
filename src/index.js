import { app } from './app.js'
import { connectDatabase } from './Dbconnect/DB.js'


connectDatabase()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log("server is started on port : ", process.env.PORT || 8000)
        })
    }).catch((error) => {
        console.log("error of database", error)
    })

// app.get('/', (req, res) => {
//     return res.status(200).json({
//         success: true,
//         message: "Welcome"
//     })
// })

// app.get("*", (req, res) => {
//     return res.status(404).json({
//         success: false,
//         message: "Inavlid Route"
//     })
// })

// app.listen(process.env.PORT || 8000, () => {
//     console.log("server is started on port : ", process.env.PORT || 8000)
// })