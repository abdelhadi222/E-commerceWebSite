import  express  from "express";
import {Register,Login,getUser,AddNewStore,UpdateImageStore,UpdateNameStore,
findStore , getByCat , deletPro , getNoti , getOnePro , getStore , confrimiToAddCommend ,getProById ,rt ,getStock ,clientConfir, AddOrMunisQu , sendCommende,getFav ,getSave , getComAdmin ,deletComById ,getCommend , checkComend , creatComend ,deletOneToCarte ,  StockColor,getAllPro, favorite  , Save , getColor, UpdatePassword,addToCarte, AddCat, deletCat ,  AddPro} from "../Controllers/Controllers.js"
import multer from "multer";

const UserRouter = express.Router()

const storage = multer.diskStorage({
    destination:(req,file,cb,next)=>{
        console.log('one');
        cb(null,'./Images');
    },
    filename:(req,file,cb)=>{

         const finame =   `${Date.now()}_${file.originalname.replace(/\s+/g,'-')}`;
        cb(null,finame)

    }
})

const upload = multer({storage:storage})




UserRouter.post('/Register', Register)
UserRouter.post('/Login', Login)
UserRouter.post('/getUser', getUser)
UserRouter.post('/AddNewStore',upload.single('logo') ,AddNewStore)
UserRouter.get('/findStore',findStore)
UserRouter.get('/getStore',getStore)
UserRouter.post('/StockColor',StockColor)
UserRouter.get('/getColor',getColor)
UserRouter.post('/UpdateNameStore',UpdateNameStore)
UserRouter.post('/UpdateImageStore',upload.single('update'),UpdateImageStore)
UserRouter.post('/UpdatePassword' ,UpdatePassword)
UserRouter.post('/AddCat' ,AddCat)
UserRouter.post('/deletCat' ,deletCat)
UserRouter.post('/AddPro' ,upload.array('images[]'),AddPro)
UserRouter.get('/getAllPro' ,getAllPro)
UserRouter.get('/getOnePro' ,getOnePro)
UserRouter.post('/addToCarte',addToCarte)
// UserRouter.post('/addQu',addQu)
UserRouter.post('/favorite',favorite)
UserRouter.post('/Save',Save)
UserRouter.post('/getByCat',getByCat)
UserRouter.post('/AddOrMunisQu',AddOrMunisQu)
UserRouter.post('/creatComend',creatComend)
UserRouter.post('/deletOneToCarte',deletOneToCarte)
UserRouter.post('/ConfiNumAndEmail',checkComend)
UserRouter.post('/getCommend',getCommend)
UserRouter.post('/deletComById',deletComById)
UserRouter.post('/getFav',getFav)
UserRouter.post('/getProById',getProById)
UserRouter.post('/getSave',getSave)
UserRouter.get('/getComAdmin',getComAdmin)
UserRouter.post('/sendCommende',sendCommende)
UserRouter.post('/clientConfir',clientConfir)
UserRouter.post('/rt',rt)
UserRouter.get('/getStock',getStock)
UserRouter.post('/confrimiToAddCommend',confrimiToAddCommend)
UserRouter.post('/deletPro',deletPro)
UserRouter.post('/getNoti',getNoti)











export default UserRouter