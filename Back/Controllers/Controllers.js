import bcrypt from 'bcrypt';
import UserModel from "../Model/User.js"
import  JWT from "jsonwebtoken";
import StoreModel from '../Model/Store.js';
import ProModel from  "../Model/Pro.js"
import ComendeModel from "../Model/Commend.js"
import NotiModel from  "../Model/notification.js"

let Url = 'http://localhost:5600/'
let ImageCov = "1705141167599_ashim-d-silva-ZmgJiztRHXE-unsplash.jpg"

export  const  AddNewStore =  async (req,res)=>{
      const {body,file} = req
      const {name,Email,password,cat} = body
      let key = 'get'

      // let Ar = [] 
      // for (let i = 0; i < cat.length; i++) {
      //     if()
         
      // }

        console.log('File => ',cat);

      //   let CatHere = [] 
      //    for (let i = 0; i < cat.length; i++) {
      //       CatHere.push(cat[i])
      //    }
        
     //  if(!Store) return  res.json('Is Not New Store')

      bcrypt.hash(password,12,async(err ,ha)=>{
          if(err){
               return res.json('Err From Hach Password')
          }
          const get = await StoreModel.find()
          console.log('get )>' , get);
          if(get.length > 0) return res.json('Impossible')

        let craetUser = await UserModel.create({First:'',Laste:'',Email:Email,password:ha,isAdmin:true})

        let Store = await StoreModel.create({name:name,logo:`${Url}${file.filename}`,key:key,idUser:craetUser._id,cat:cat,imageCov:ImageCov})

          let token = JWT.sign({id: craetUser._id},'keytoken')
      return res.json({User:craetUser,token:token , st:Store})
      })
     

}

export const findStore = async(req,res)=>{
      const get = await StoreModel.find()
      if(get.length > 0 ) return res.json(true)
      return res.json(false)
}

export const Register = async (req,res)=>{
     const {body} = req
     const { data , phone} = body
     const {FirstName,LasteName,Email,Pays,ville,password} = data
     console.log(password);


     let ch = await UserModel.find({Email:Email})

     if(ch.length > 0 ) {
        return res.json('Email Is Ready Exsit')
     }
     console.log(ch);


     bcrypt.hash(password,12,async(err,ha)=>{
        if(err){
             return res.json('Err From Hash Password')
        }
         let craetUser = await UserModel.create({First:FirstName,Laste:LasteName,Email:Email,Pays:Pays,Ville:ville,password:ha,carte:[],numCom:0,to:0,phone:phone})
        if(!craetUser){
            return res.json('User Not Creat')
        }
        const {_id} = craetUser
        let token = JWT.sign({id:_id},'keytoken')
        return res.json({User:craetUser,token:token})
     })

   
}

export const Login = async (req,res)=>{
     const {body} = req
     const {Email,password} = body

    let get = await UserModel.findOne({Email:Email})
      if(get.length == 0){
          return res.json(401)
      }
      let {password:pasDB}  = get

     bcrypt.compare(password,pasDB,async(err,resp)=>{
        if(err){
             return res.json('Err From Hash Password')
        }
        if(!resp){
             return res.json('Password is Worng')
        }

        let token = JWT.sign({id:get._id},'keytoken')
         
        return res.json({token:token,User:get})
     })

   
}

export const getUser = async(req,res)=>{
      const {body} = req
      const {token} = body

      let GetIdUsert =  JWT.verify(token,'keytoken')
      let {id} = GetIdUsert

      let getUser = await UserModel.findOne({_id:id})
      if(!getUser){
          return res.json('User not Found')
      }

      return res.json({User:getUser,check:true})
}

export const  getStore = async (req,res)=>{
       const gets = await StoreModel.findOne({key:'get'})
       if(!gets) return res.json('Is Not found Store')

       return res.json({store:gets})
}

export const StockColor = async(req,res)=>{
   const {body  }= req
   const{color,type , token} = body
   const{colorBack,colorFont,colorBox} = color
   console.log(body);
   console.log(type);


   const getId = JWT.verify(token,"keytoken")
   const {id} =  getId
   const getStore = await StoreModel.findOne({idUser:id})
   if(!getStore) return res.json('Store not found ')

     if(type == 'Back') {
       await getStore.updateOne({Back:colorBack})
        getStore.save()
        return res.json('Color BACK Is Add')
     }

     if(type == 'Box') {
        await getStore.updateOne({Box:colorBox})
        getStore.save()
        console.log('dddd',getStore);
        return res.json('Color Box Is Add')
     }

     if(type == 'Font') {
       await getStore.updateOne({Font:colorFont})
        getStore.save()
        return res.json('Color Font Is Add')
     }
}

export const getColor =  async(req,res)=>{
   console.log('hi');
       try {
            const get = await StoreModel.find()
            if(!get || get.length < 1) return res.json('Is Not Find Store')
            return res.json({Store:get})

       } catch (err) {
          console.log('Validation err from  color get  ',err);
       }
}

export  const UpdateNameStore= async(req,res)=>{
   const {body} = req
   const {newName, type,NewEmail,token} = body
   console.log(type);
   console.log(NewEmail);
   if(type == 'Name') {
        let getSt = await StoreModel.find()
   if(!getSt){
     return res.json('Is Not Found Store')
   }
   console.log(getSt);
  
   await getSt[0].updateOne({name:newName})
   
    return res.json('Is DOne Update Name Store ')
   }
   if(type == "Email") {
      let getId = JWT.verify(token,'keytoken')
      const {id} = getId
   let getSt = await UserModel.findOne({_id:id})
   if(!getSt){
     return res.json('Is Not Found User')
   }
   await  getSt.updateOne({Email:NewEmail})
     
    return res.json('Is DOne Update Email Store ')
   }
}

export  const UpdateImageStore= async(req,res)=>{
   const {file} = req
   
   let getSt = await StoreModel.find()
   if(!getSt){
     return res.json('Is Not Found Store')
   }
   await getSt[0].updateOne({logo:`${Url}${file.filename}`})
    return res.json('Is DOne Update Image Store')
}


export  const UpdatePassword = async(req,res)=>{
   const {body} = req
   const {oldPassword,NewPassword , consfirmationPassword  , token} = body

   let getId =  JWT.verify(token,'keytoken')
   let {id} = getId
   
   let getUser = await UserModel.findOne({_id:id})
   if(!getUser){
     return res.json('Is Not Found User')
   }
   const {password:passDb} = getUser

  bcrypt.compare(oldPassword,passDb,async(err,response)=>{
          if(err) {
           return  res.json('Err From Validation password Update =>' , err)
          }
          if(!response) return res.json('The Password is Worgn')

  
              bcrypt.hash(NewPassword,12,async(err,ha)=>{
                 if(err ) {
                   console.log(err);
                   return res.json(err)
                 }
                 await getUser.updateOne({password:ha})
                 return res.json('Is Update Password is Done')
              })
           


     })

}

export const AddCat = async(req,res)=>{
    const {body} = req
    const{cats} = body
    console.log(cats);
    let getStore = await StoreModel.find()
    const {cat} = getStore[0]


    for (let i = 0; i < cats.length; i++) {
      for (let j = 0; j < cat.length; j++) {
        
        if(cats[i].toLowerCase() == cat[j].toLowerCase()){
          console.log('one' , cats[i].toLowerCase());
          console.log('Two' , cat[j].toLowerCase());
         console.log('****');
           cat.splice(j,1)
        }
      }
    }
   //  console.log(cat);
   //  console.log(cats[2].toLowerCase() == cat[0].toLowerCase());
    

    let newAr = [...cat,...cats]
    console.log('NewAr => ',newAr);
    await getStore[0].updateOne({cat:newAr})
    return res.json('IS UPDTA Cat ')

}

export const deletCat = async (req,res)=>{ 
   const {body} = req
   const {Onecat} = body
   const getS = await StoreModel.find()
   let {cat} = getS[0]
   console.log(Onecat);
   console.log(cat);

   let AR = cat.filter((e,i)=>{
       return e.toLowerCase() != Onecat.toLowerCase()
   })

   await getS[0].updateOne({cat:AR})

   return res.json('Cat IS Delete')

} 


export const AddPro = async (req,res)=>{
    const {body,files} = req
    const {Titel,des,Price,cat , qu} = body

    console.log(files);

     try {
    //   let ims = files.filter((e)=>{
    //     const {filename} = e
    //    return filename
    // })
    // console.log("dddddddddd => ",ims);
    let ims = []

    for (let i = 0; i < files.length; i++) {
        ims.push(`${Url}${files[i].filename}`) 
    }
    console.log("dddddddddd => ",ims);

    let creatpro = await ProModel.create({qu:qu,Titel:Titel,des:des,price:Price,cat:cat,Images:ims,Image:`${ims[0]}`,saved:[]})
    if(!creatpro){
       return res.json('Pro Is Not Craet')
    }
    return res.json('Pro Is Creat ')
     } catch (err) {
       console.log(err);
     }
}

export const getAllPro =  async (req,res)=>{
    const getAll = await ProModel.find()
    if(getAll.length == 0 || !getAll) {
      return res.json('Pro Is Found')
    }
    return res.json({AllPro:getAll})
}

export const addToCarte = async (req,res) =>{
   const {body} = req 
   const {pro,token} = body

   const getId = JWT.verify(token,'keytoken')
   const {id} = getId

   const getUser = await UserModel.findOne({_id:id})
   const {carte:car,isAdmin} = getUser

   if(isAdmin) return
   
  
   await getUser.updateOne({carte:[...car,pro]})

   return res.json('Is Done Caret')

}

// export const addQu = async (req,res)=>{ 
//    const {body} = req
//    const {pro,token} = body

//    console.log(pro);

//    const getId = JWT.verify(token,'keytoken')
//    const {id} = getId

//   const getUser = await UserModel.findOne({_id:id})
//   const {carte:car} = getUser


//   let test = car.map((e,i)=>{
//      return  e.Titel == pro.Titel && e.image == e.image && e.price == pro.price ?i:''
//   }).join('')
//   console.log('t',test);

//   if(test!='' || !test) {
//      car.splice(test,1)
//      let newR = [...car,pro]
//     await getUser.updateOne({carte:newR})
//     return res.json('Add Qu Done !')

//   }

//   // car[test].qu = parseInt(car[test].qu) - 1
//   // getUser.save()
//   // return res.json(' Is Done ')



// }


export const favorite = async (req,res) =>{
   const {body} = req
   const {idPro , token} = body

   const getId = JWT.verify(token,'keytoken')
   const {id} = getId
   const getUser = await UserModel.findOne({_id:id})
   const {Fav} = getUser

   let getFav = Fav.some((e)=> e == idPro)

   if(getFav){
      let newAr =  Fav.filter((e)=>{
         return e != idPro
      })
      console.log(newAr);
   await getUser.updateOne({Fav:newAr})
   return res.json('Fav Is Remove')
   }

   await getUser.updateOne({Fav:[...Fav,idPro]})

   return res.json('Fav Is Add')


}


export const Save = async (req,res) =>{
   const {body} = req
   const {idPro , token} = body

   const getId = JWT.verify(token,'keytoken')
   const {id} = getId
   const getUser = await UserModel.findOne({_id:id})
   const {saveInUser} = getUser

  //  let Ar = [...fav,idPro]
   
  //  await getUser.updateOne({fav:Ar})

  const getPro = await ProModel.findOne({_id:idPro})
  const {saved} = getPro

  let getFav = saved.some((e)=> e == id)

   if(getFav){
      let newAr =  saved.filter((e)=>{
         return e != id
      })
   
   await getPro.updateOne({saved:newAr})
   await getUser.updateOne({saveInUser:newAr})
   return res.json('save Is Remove')
   }

   await getPro.updateOne({saved:[...saved,id]})
    await getUser.updateOne({saveInUser:[...saveInUser,id]})

   return res.json('save Is Add')

}

export const getByCat = async (req,res)=>{
    const {body} = req 
    const {cat} = body
    
    const getPro = await ProModel.find({cat:cat})
    if(getPro.length == 0) return res.json('Is Not Found Pro')
    return res.json({ProCat:getPro})
   
}





export const AddOrMunisQu = async(req,res)=>{
  const{body} = req
  const {type, token ,idPro} = body
  

  let getid = JWT.verify(token,'keytoken')
  const {id} = getid
  const getUser = await UserModel.findOne({_id:id})
  const{carte} = getUser
  
  if(type == 'Plus') {
   for (let i = 0; i < carte.length; i++) {
       if(carte[i].idPro == idPro ){
          carte[i].qu = carte[i].qu + 1
          carte.splice(i,1,carte[i])
          await getUser.updateOne({carte:[...carte]})
          return res.json('Is Add Qu')
       }
   }
  }

   if(type == 'Munis') {
   for (let i = 0; i < carte.length; i++) {
       if(carte[i].idPro == idPro ){
         if(carte[i].qu == 1) return
          carte[i].qu = carte[i].qu - 1
          console.log(carte[i].qu);
          carte.splice(i,1,carte[i])
          await getUser.updateOne({carte:[...carte]})
           return res.json('Is Munis Qu')
       }
  }
}
}


export const deletOneToCarte = async (req,res)=>{
  const {body} = req
  const {idPro,token} = body

 let getid = JWT.verify(token,'keytoken')
  const {id} = getid
  const getUser = await UserModel.findOne({_id:id})
  const{carte} = getUser

  let NewAr = carte.filter((e)=>{
    return e.idPro != idPro
  })

  await getUser.updateOne({carte:[...NewAr]})
  return res.json('Is Delet')

  
}

export const creatComend = async(req,res)=>{
   const {body}  = req
   const {token , product,total, idRe} = body
   console.log(body);

 try {
   let getid = JWT.verify(token,'keytoken')
  const {id} = getid




  let AllPro = []
  let err = []
  let bol = true
 
  for (let i = 0; i < product.length; i++) {
    let y =  await ProModel.findOne({_id:product[i].idPro})
     let newQu = y.qu - product[i].qu
    if(newQu < 0 && y.qu != 0 ) {
      err.push({err:`the quantity you order of this prouduct  ${y.Titel} is not availble  ${y.qu} are available `,ima:y.Image , idP:y._id , end:false })
      continue
    }

     if(y.qu == 0 && newQu < 0 ) {
      err.push({err:`the quantity you order of this prouduct  ${y.Titel} is Over `,ima:y.Image , idP:y._id , end:true })
      
      continue
    }
    
   //  let newQu = y.qu - product[i].qu
    
   await y.updateOne({qu:newQu})
  }

  //    let u  = await ProModel.findOne({_id:product[i].idPro})
//    console.log('UU' , u);
//    if(u.qu == 0) {
//        product.splice(i,1)
//    }
//   }
//   if(product.length == 0 ) {return res.json({message:false})}



  if(err.length > 0 ) {
    return res.json({errCom:err})
  }

//   for (let i = 0; i < product.length; i++) {
//    let u  = await ProModel.findOne({_id:product[i].idPro})
//    console.log('UU' , u);
//    if(u.qu == 0) {
//        product.splice(i,1)
//    }
//   }
//   if(product.length == 0 ) {return res.json({message:false})}


  const getUsr= await UserModel.findOne({_id:id})
  const {numCom:numC} = getUsr

  const getS = await StoreModel.find()
  const {numCom} = getS[0]
  await getS[0].updateOne({numCom:numCom+1})

      const creat = await ComendeModel.create({Pro:product,Totel:total,IdUser:id,numUser:numC+1,numAdmin:numCom+1})
    await getUsr.updateOne({carte:[],numCom:numC + 1})


    const {_id ,  numAdmin} = creat 

    let creatNoti = await NotiModel.create({IdUserSe:id ,IdUserRe:idRe,type:100,idCom:_id , numComAdmin:numAdmin})
    
  return res.json({num:numAdmin,message:'Is Craet Commend Done',errCom:err})
 } catch (err) {
    console.log(err);
 }



}


export const getNoti = async (req,res)=>{
    const {body} = req 
    const {token} = body
    const getId = JWT.verify(token,'keytoken')
    const {id} = getId
    const getNoti = await NotiModel.find({IdUserRe:id})
    return res.json({Noti:getNoti})
}


export const confrimiToAddCommend = async (req,res) =>{
   const {body}  = req
   const {token , product,total , err , idAdmin } = body
  let getid = JWT.verify(token,'keytoken')
  const {id} = getid
  let newTotel = ''
      
  // get User
    let getUser = await UserModel.findOne({_id:id})
    const {carte} = getUser
    const {numCom:numC} = getUser

     for (let i = 0; i < err.length; i++) {
       for (let j = 0; j < product.length; j++) {
         if(err[i].idP == product[j].idPro && err[i].end) {
            console.log( 'P ',product[j]);
            newTotel = total -  (product[j].price *  product[j].qu)
            product.splice(j,1)
         }
       }
     }
     if (product.length  == 0) {
        return 
     }

  

     for (let i = 0; i < product.length; i++) {
    let y =  await ProModel.findOne({_id:product[i].idPro})
     let newQu = y.qu - product[i].qu

    if(  newQu < 0 ) {
        product[i].qu = y.qu
       let p =  await ProModel.findOne({_id:product[i].idPro})
       let {qu} = p
       await p.updateOne({qu:qu - product[i].qu })

    }
   //  let newQu = y.qu - product[i].qu
  }
   
   //  const getUsr= await UserModel.findOne({_id:id})

      const creat = await ComendeModel.create({Pro:product,Totel:newTotel != '' ?newTotel:total,IdUser:id,num:numC+1})
    await getUser.updateOne({carte:[],numCom:numC + 1})
    const {_id} = creat

    let creNo =  await NotiModel.create({  IdUserRe:idAdmin,  IdUserSe:id,type:100,idCom:_id})

  return res.json('Is Craet Commend Done')
}





export const checkComend = async (req,res)=>{
    const {body} = req
    const {token , email, phone } = body
   let getid = JWT.verify(token,'keytoken')
  const {id} = getid
  const getUsr= await UserModel.findOne({_id:id})
  const { phone:ph, Email} = getUsr
  if(phone == ph && Email == email) return res.json('Is Meme')
  await getUsr.updateOne({Email:email,phone:phone})
  return res.json('Is Update')

}

export const getCommend = async(req,res)=>{
    const {body} = req
    const {token} = body
   let getid = JWT.verify(token,'keytoken')
     const {id} = getid

     const getCm = await ComendeModel.find({IdUser:id})
     return res.json({AllCom:getCm , idUser:id})
}

export const deletComById = async (req,res)=>{
    const {body} = req
    const {idCom , idS,idR } = body

    let getcom = await ComendeModel.findOne({_id:idCom})
    let {Pro} = getcom

    for (let i = 0; i < Pro.length; i++) {
      let {idPro} = Pro[i]
       let y = await ProModel.findOne({_id:idPro})
       let {qu} = y
       await y.updateOne({qu:parseInt(qu) + parseInt(Pro[i].qu)})
    }
    let getC= await ComendeModel.findOne({_id:idCom})
    const {numAdmin} = getC

    let getN = await NotiModel.deleteOne({_id:idCom, type:100})
    let crar = await NotiModel.create({idCom:idCom, type:10,IdUserRe:idR,IdUserSe:idS,numComAdmin:numAdmin})

    let getS = await StoreModel.find()
    const {numCom} = getS[0]
    if(numCom != 0) {
       await getS[0].updateOne({numCom:numCom-1})
    }



     let getU = await UserModel.findOne({_id:idS})
    const {numUser} = getU
     if(numUser != 0) {
       await getU.updateOne({numCom:numCom-1})
    }


    let delet = await ComendeModel.deleteOne({_id:idCom})
    let d = await NotiModel.deleteMany({idCom:idCom})
    if(!delet) { return res.json('Is Not Delet')}
    return res.json({a:delet,message:true,num:numAdmin})
}


export const getFav = async (req,res)=>{
  const {body} = req
  const{token} = body
     let getid = JWT.verify(token,'keytoken')
     const {id} = getid

       const getUser = await UserModel.findOne({_id:id})
       const {Fav} = getUser
       let AllFav = []
       for (let i = 0; i < Fav.length; i++) {
          let One =  await ProModel.findOne({_id:Fav[i]})
          AllFav.push(One)
       }
       return res.json({AllFav:AllFav})
}


export const getSave = async(req,res)=>{
     const {body} = req
     const{token} = body
     let getid = JWT.verify(token,'keytoken')
     const {id} = getid
       const getUser = await UserModel.findOne({_id:id})
       const {saveInUse} = getUser
       let AllSave = []
       for (let i = 0; i < saveInUse.length; i++) {
          let One =  await ProModel.findOne({_id:saveInUse[i]})
          AllSave.push(One)
       }
       return res.json({AllSave:AllSave})
}

export const getProById = async (req,res)=>{
  const {body} = req
  const {idPro} = body
  const getPro = await ProModel.findOne({_id:idPro})
  return res.json({Pro:getPro})
}

export const getComAdmin = async(req,res)=>{
   // const {body} = req
   // const {} = bol

   let get = await ComendeModel.find()

   let NoSend = get.filter((e)=>{
      return !e.isDoneFromAdmin
   })
   let ArNotSendUser =  []
    for (let i = 0; i < NoSend.length; i++) {
      let y =  await UserModel.findOne({_id:NoSend[i].IdUser})
      ArNotSendUser.push(y)
    }



   let send = get.filter((e)=>{
      return e.isDoneFromAdmin && !e.rt
   })
   let SendUser = []
       for (let i = 0; i < send.length; i++) {
      let y =  await UserModel.findOne({_id:send[i].IdUser})
     SendUser.push(y)
    }

    let rta = get.filter((e)=>{
       return e.rt == true
    })
    let arRou = []

    for (let i = 0; i < rta.length; i++) {
       let y =  await UserModel.findOne({_id:rta[i].IdUser})
       arRou.push(y);
    }


   return res.json({send:send ,SendUser:SendUser,notSend:NoSend,ArNotSendUser:ArNotSendUser,rt:rta,rtUser:arRou})

}



export const sendCommende =  async(req,res)=>{
   const{body} = req
   const{idCom , token} = body
   console.log(idCom);
   let get = JWT.verify(token,'keytoken')
   const {id} = get
   const getC= await ComendeModel.findOne({_id:idCom})
   let {IdUser} = getC
   await getC.updateOne({isDoneFromAdmin:true})
    let ceteNoti = await NotiModel.create({IdUserSe:id,IdUserRe:IdUser,type:1,idCom:idCom})

    let DeletN = await NotiModel.deleteOne({idCom:idCom,type:100})
    console.log(DeletN);

  return res.json('iS Updte To True ')
}




export const clientConfir =  async(req,res)=>{
   const{body} = req
   const{idCom , idR, idS} = body
   const getC= await ComendeModel.findOne({_id:idCom})
  await getC.updateOne({isDoneFromClient:true})

  let ya =  await ComendeModel.findOne({_id:idCom})
  let {numAdmin} = ya
   


  let y =  await NotiModel.create({type:30,IdUserRe:idR,IdUserSe:idS,idCom:idCom , numComAdmin:numAdmin})

  return res.json({num:numAdmin,message:'Is Update To True '})
}

export const rt =  async(req,res)=>{
   const{body} = req
   const{idCom , idR, idS} = body
   // let getId =  JWT.verify(token,'keytoken')
   // const {id} = getId

   // let getUser = await UserModel.findOne({_id:id})
   // const{carte} = getUser

   const getC= await ComendeModel.findOne({_id:idCom})
   let {Pro} = getC

   
    for (let i = 0; i < Pro.length; i++) {
       const {idPro} = Pro[i]
       let y = await ProModel.findOne({_id:idPro})
        const {qu} = y
       await y.updateOne({qu: parseInt(qu) + parseInt(Pro[i].qu)})
    }
  
  await getC.updateOne({rt:true})

  let y =  await ComendeModel.findOne({_id:idCom})
  let {numAdmin} = y
   
let c = await NotiModel.create({type:20,IdUserRe:idR,IdUserSe:idS,idCom:idCom,  numComAdmin:numAdmin})
   
  return res.json({num:numAdmin,message:'Is Update To True '})
}


export const getStock = async(req,res)=>{
   try {
       const getP =  await ProModel.find()
       let ar = []
       for (let i = 0; i < getP.length; i++) {
         const {price,qu,Titel,Image,cat,_id} = getP[i]
           ar.push({price:price,qu:qu,titel:Titel,image:Image,cat:cat,id:_id})
       }
       return res.json({stock:ar})

   } catch (err) {
      console.log(err);
   }
}

export const deletPro =  async (req,res)=> {
   const {body} = req
   const {idP} = body 

   const delet = await ProModel.deleteOne({_id:idP})
   return res.json('Is Delet Pro')
}

export const getOnePro = async  (req,res)=>{
    const {body} = req
    const {idP} = body
    let getPro = await ProModel.findOne({_id:idP})
    return res.json({OnePro:getPro})
}