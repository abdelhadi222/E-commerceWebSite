import mongoose from "mongoose";
const UserModel = mongoose.Schema({
    First:{
        type:String,
    },
    Laste:{
        type:String,
    },
    Email:{
        type:String,
    },
    password:{
        type:String
    },
    Pays:{
        type:String
    },
    Phone:{
        type:String
    },
    Ville:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    carte:{
        type:[Object]
    },
    Fav:{
        type:[String]
    },
    phone:{
        type:String
    },
    numCom:{
        type:Number
    },
    saveInUser:{
      type:[String],
      default:[]
    },
    creat:{
        type:Date,
        default:()=> new Date()
    }
    
})
export default mongoose.model('User',UserModel)