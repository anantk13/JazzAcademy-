import mongoose from "mongoose";

export async function connect(){
     try{
       mongoose.connect(process.env.MONGO_URI!)  // ! is used as we r using ts so it needs gurantee that string is returned but it can be undefined too so ! is denoting that string is coming
       const connection = mongoose.connection
       connection.on('connected',() => {      // on is an event and connected is event listener
        console.log('MongoDB connected')
       })
       connection.on('error',(err)=>{
        console.log('MongoDB connection error , please make sure db is up and running: ' + err)
        process.exit()
       })
     }catch(error){
        console.log('Something went wrong in connecting to db')
    console.log(error)     }
}
