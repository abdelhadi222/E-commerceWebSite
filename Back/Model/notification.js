import mongoose from "mongoose";
const NotiModel = mongoose.Schema({
    IdUserRe:{
        type:String,
    },
     IdUserSe:{
        type:String,
    },
    type:{
        type:Number,
    },
    idCom:{
       type:String,
    },
    numComAdmin:{
     type:Number
    },
    creat:{
        type:Date,
        default:()=> new Date()
    }
    
})
export default mongoose.model('Noti',NotiModel)