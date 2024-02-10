import mongoose from "mongoose";
const CardModel = mongoose.Schema({
    IdUser:{
        type:String,
    },
    IdPro:{
        type:String,
    },
    creat:{
        type:Date,
        default:()=> new Date()
    }
    
})
export default mongoose.model('Card',CardModel)