import mongoose from "mongoose";
const ProModel = mongoose.Schema({
    Titel:{
        type:String,
    },
    des:{
        type:String,
    },
    price:{
        type:String,
    },
    cat:{
        type:String
    },
    Image:{
        type:String
    },
    Images:{
        type:[String]
    },
    saved:{
        type:[String]
    },
    qu:{
        type:Number
    },
    creat:{
        type:Date,
        default:()=> new Date()
    }
    
})
export default mongoose.model('Pro',ProModel)