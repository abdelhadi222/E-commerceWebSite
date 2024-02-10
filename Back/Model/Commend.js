import mongoose from "mongoose";
const ComendeModel = mongoose.Schema({
    IdUser:{
        type:String,
    },
    Pro:{
        type:[Object],
    },
    Totel:{
        type:Number
    },
    numUser:{type:Number},
    isDoneFromClient:{
        type:Boolean,
        default:false
    },
     isDoneFromAdmin:{
        type:Boolean,
        default:false
    },
    rt:{
        type:Boolean,
        default:false
    },
    numAdmin:{
        type:Number
    },
    creat:{
        type:Date,
        default:()=> new Date()
    }
    
})
export default mongoose.model('Comende',ComendeModel)