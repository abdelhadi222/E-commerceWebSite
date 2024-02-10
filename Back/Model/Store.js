import mongoose from "mongoose";

let StoreModel = mongoose.Schema({
      name:{
        type:String
      },
      logo:{
        type:String
      },
      idUser:{
        type:String
      },
      key:{
         type:String
      },
      Back:{
        type:String
      },
      Box:{
        type:String
      },
      Font:{
        type:String
      },
      imageCov:{
        type:String
      },
      numCom:{
       type:Number,
       default : 0
      },
      cat:{
        type:[String]
      },
      creat:{
        type:Date,
        default:()=>new Date()
      }

})
export default mongoose.model('Store',StoreModel)