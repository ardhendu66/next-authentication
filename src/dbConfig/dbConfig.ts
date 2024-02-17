import mongoose from "mongoose"

export const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log('mongodb connected successfully')
        })
        connection.on('error', (err) => {
            console.error(`Mongodb connection error. Make sure mongodb server is running. 
            ${err.message}`)
            process.exit()
        })
    }
    catch(err: any) {
        console.error(`Connection Error: ${err.message}`)
    }
}