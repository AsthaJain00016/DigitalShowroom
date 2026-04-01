import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

import {app} from './app.js'
import connectDB from './db/index.js'


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5000,()=>{
        console.log(`Server is running on port ${process.env.PORT || 5000}`)
    })
})
.catch((error)=>{
    console.log(`Error: MongoDB connection failed ${error}`)
})