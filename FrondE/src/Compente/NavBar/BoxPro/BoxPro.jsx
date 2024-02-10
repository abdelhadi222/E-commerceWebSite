import {Color} from "../../../context/Color"
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {  faHeart, faBookmark} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../BoxPro/BoxPro.css"
export default function BoxPro(props) {
     let colorContext = useContext(Color)

     let [fav,setFav]= useState(false)
        let [save,setSave]= useState(false)
         let [newRelode,setNewRelode]= useState(false)
     console.log();
    const {Titel,cat,price,Image,images,des , idPro , rr , saved} = props
    let [user ,setUser] = useState('')
    // let [relode ,setRelode] = useState(true)

    let nav = useNavigate()
    console.log('rrrrr' , 'r');

    let newDes = ''

    if(des.length > 70) {
        newDes = des.slice(0,90)
        console.log("New",newDes);
    }


    useEffect(()=>{
      getUser()
    },[newRelode , saved])




      async function getUser() {
        if(!window.localStorage.getItem('token')){
            setUser('Vide')
            return
        }
        try {
            const res = await axios.post('http://localhost:5600/api/getUser',{token:window.localStorage.getItem('token')}) 
            console.log( 'FRom Nav BAt => ', res.data);
            setUser(res.data.User)
            let test = res.data.User.Fav.some((e)=>e == idPro)
            if(test){
              setFav(true)
            }else{
               setFav(false)
            }

            
             let newTest = saved.some((e)=> e == res.data.User._id)

            if(newTest){
               console.log('yah');
               setSave(true)
            }else{
               setSave(false)
            }
            

            
            //  if(typeof res.data === "object"){
            //     return setTest(false)
            //  }
             
        } catch (err) {
           
            console.log(err);
        }
    }

    


   //  function ADDCARTE() {
     
      
   //    let test =  Array.isArray(colorContext.carte) && colorContext.carte.length > 0  &&
   //     colorContext.carte.map((e,i)=> e.price == price && e.Titel == Titel && e.image == Image ?i:'').join('')

   //      console.log('Tets =' , test);
   //          colorContext.setTog(false)

   //     if(!test) {
   //               colorContext.setTotel(p=>parseInt(p) + parseInt(price))
   //               colorContext.setCaret([...colorContext.carte,{Titel:Titel,image:Image,price:price,qu:1,idP:idPro}])
                 
   //                  if(user == 'Vide') {
   //                    nav('/Login')
   //                 }
   //               return
   //     }

   //        colorContext.carte[test].qu = colorContext.carte[test].qu + 1
   //        colorContext.setTotel(p=>parseInt(p) + parseInt(price))
   //        addQu(test)


       

     
       
         


   //  }


    async function addTocaretBack() {
      console.log('User ' ,user);
      if(user == "Vide")  {
         nav('/login')
      }
      let test = colorContext.carte.some((e)=> e.idPro == idPro)
      console.log(test);

      if(test) {
          Qu('Plus')
          colorContext.setAdd(p=>!p)
          return
      }

       try {
         const res = await axios.post('http://localhost:5600/api/addToCarte', {token:window.localStorage.getItem('token'),pro:{Titel:Titel,price:price,image:Image,qu:1,idPro:idPro}})
         console.log(res);
            colorContext.setTog(false)
           colorContext.setAdd(p=>!p)
     
       } catch (err) {
          console.log(err);
       }
    }

     async function Qu(type) {
         
        try {
           const res = await axios.post('http://localhost:5600/api/AddOrMunisQu',{token:window.localStorage.getItem('token'),idPro:idPro,type:type})
           console.log(res);
           colorContext.setTog(false)
         //   if(res.data =='Is Munis Qu' || res.data =='Is Add Qu' ){
         //      colorContext.setAdd(p=>!p)
         //   }
  
        } catch (err) {
           console.log(err);
        }
    }

       async function Fav() {
        try {
           const res = await axios.post('http://localhost:5600/api/favorite',{token:window.localStorage.getItem('token'),idPro:idPro})
           console.log(res);
           setNewRelode(p=>!p)
           rr(p=>!p)
          //  console.log(colorContext);
          //   colorContext.setRelode(p=>p)
        } catch (err) {
           console.log(err);
        }
    }


       async function Save() {
        try {
           const res = await axios.post('http://localhost:5600/api/Save',{token:window.localStorage.getItem('token'),idPro:idPro})
           console.log(res);
           rr(p=>!p)
         //   colorContext.setAdd(p=>!p)
         //   setNewRelode(p=>!p)

          //  console.log(colorContext);
          //   colorContext.setRelode(p=>p)
        } catch (err) {
           console.log(err);
        }
    }




    



   let backColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back
   let boxColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Box
    let fontColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Font
    return(
     
      <div   className="boxPro">
           <div >
                                  <Link to={`/shwoP/${idPro}`} style={{textDecoration:'none'}} >
                                     <div   style={{background:`url(${Image})`,textDecoration:'none',borderRadius:'10px 10px 0 0 ',width:'100%',height:'200px',backgroundRepeat:'no-repeat',backgroundSize:'cover'}} className="fffg">
                                      <div style={{position:"absolute",color:'black',display:'flex',gap:'10px',margin:"10px",right:'0',top:'0px'}}>
                                         <div className="IconProUp" style={{background:backColor,color:fav?boxColor:fontColor}} onClick={Fav}><FontAwesomeIcon icon={faHeart} /></div>
                                         <div  className="IconProUp" style={{background:backColor,color:save?boxColor:fontColor}} onClick={Save}><FontAwesomeIcon icon={faBookmark} /></div>
                                      </div>
                                  </div>
                                  </Link>

                                  <div>
                                     <div style={{display:'flex',justifyContent:'space-between',marginTop:'5px',padding:'4px'}}>
                                         <h3>{Titel}</h3>
                                         <h3>category : {cat}</h3>
                                     </div>
                                  </div>

                                  <div style={{margin:'20px 10px',width:'100%'}}>
                                     <h3 style={{marginBottom:'10px'}}>Descprition</h3>
                                     <div style={{width:'100%',height:'40px',textOverflow:'ellipsis',overflow:'hidden'}}>{newDes!='' ? `${newDes}...`:des}</div>
                                  </div>

                                  <div style={{margin:'20px 10px' ,display:'flex',justifyContent:'space-between'}} >
                                     <div>
                                       <h3 style={{marginBottom:'5px'}}>Price</h3>
                                       <p style={{color:'green'}}>{price}Da</p>
                                     </div>

                                     <div style={{alignSelf:'center'}} className="BuAddCat">
                                       <button style={{background:backColor,color:fontColor}} onClick={addTocaretBack}>Add To Carte</button>
                                     </div>
                                  </div>
                         </div>
                       
      </div>
                   
              

    )
}