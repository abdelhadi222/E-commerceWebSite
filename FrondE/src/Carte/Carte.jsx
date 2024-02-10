import { useEffect, useState } from "react"
import { useContext } from "react";
import {Color}  from "../context/Color.jsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import "../Carte/Carte.css"
import axios from "axios";
export default function Carte(props) {
    const {Titel,Price,Image,qu ,idP , relode , ind  , ct } = props

    // async function getUser() {
    //    try {
    //        const res = await axios.post('http://localhost:5600/api/getUser',{token:window.localStorage.getItem('token')})
    //        console.log('Res data => ',res.data);
    //    } catch (err) {
    //      console.log(err);
    //    }
    // }
      
   //  const [qut,setQut] = useState(qu)
   //  let [relode,setRelode] = useState(false) 
   let [index,setIndex] = useState('')
   let [relodee,setRelodee] = useState('')
   let [iy,setIy] = useState(false)
   let colorContext = useContext(Color)

    let backColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back
    let boxColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Box
    let fontColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Font
   
   //   useEffect(()=>{
   //     let u =  ct.some((e)=>idP == e.idP )
   //      if(u) {
   //        setQut(qu)
   //      }
   //   },[relode])
   

  //  async function getOnePro() {
  //   try {
  //      const res = await axios.post('http://localhost:5600/api/getOnePro',{idP:idP})
  //      console.log(res);
  //   } catch (err) {
  //      console.log(err);
  //   }
  //  }


        async function deletFroCaret() {
      try {
        const res = await axios.post('http://localhost:5600/api/deletOneToCarte',{token:window.localStorage.getItem('token'),idPro:idP})
           console.log(res);
           colorContext.setAdd(p=>!p)
           setRelodee(p=>!p)
         //   let l = ind + 1
         //   setQut(ar[ind + 1].qu)
      } catch (err) {
         console.log(err);
      }
    }

   

   //  function Muns() {
   //   if(qut == 1 ) {
   //      return
   //   }
   //   colorContext.setTotel(p=> parseInt(p) - parseInt(Price))
   // //   let indexx = colorContext.carte.map((e,i)=> e.idP == idP ?i:'').join('')
   // //   colorContext.carte[ind].qu = parseInt(colorContext.carte[ind].qu) -1
   //   setQut(p=>p-1)
   //   MuQu()
   //  }

   //  function plis() {
   //     colorContext.setTotel(p=> parseInt(p) + parseInt(Price))
   //     setQut(p=>p+1)
   //       // let indexx = colorContext.carte.map((e,i)=> e.idP == idP ?i:'').join('')
   //       // console.log('***',indexx);
   //       // colorContext.carte[ind].qu = colorContext.carte[ind].qu + 1
       
   //     console.log(qut);
   //     addQu()
   //  }



   // async function deletFroCaret(idPro) {
   //    try {
   //      const res = await axios.post('http://localhost:5600/api/deletOneToCarte',{token:window.localStorage.getItem('token'),idPro:idPro})
   //         console.log(res);
   //         relode(p => !p)
   //         setIy(p=>!p)
   //         colorContext.setAdd(p=>!p)
   //       //   let l = ind + 1
   //       //   setQut(ar[ind + 1].qu)
   //    } catch (err) {
   //       console.log(err);
   //    }

   //    // let test = Array.isArray(colorContext.carte) && colorContext.carte.length > 0 && 
   //    // colorContext.carte.map((e,i)=> idP == e.idP ?i:'').join('')

  
   //    // let th = parseInt(colorContext.carte[test].qu) * parseInt(colorContext.carte[test].price )

   //    // colorContext.setTotel(p=> parseInt(p) - th) 
   //    // let y =   colorContext.carte.length >0 &&  colorContext.carte.filter((r,i)=>{

   //    //     return  r.idP != idP
   //    // })
   //    // console.log('YYY= ',y);
   //    // colorContext.setCaret(y)
   //    // // colorContext.carte.splice(test,1)
   //    // // console.log('test' , test);
   //    // // console.log('dddd',colorContext.carte);
   //    // // setQut(colorContext.carte[test - 1].qu)
   //    // // setRelode(p=>!p)
   //    // relode(p=>!p)
   //  }



       async function Qu(type) {
          console.log('****************1',idP);
        
            
        try {
           const res = await axios.post('http://localhost:5600/api/AddOrMunisQu',{token:window.localStorage.getItem('token'),idPro:idP,type:type})
           console.log(res);
          //  if(res.data =='Is Munis Qu' || res.data =='Is Plus Qu' ){
          //     colorContext.setAdd(p=>!p)
          //  }
  
        } catch (err) {
           console.log(err);
        }

           if(type == 'Plus') {
               // setQut(p=> parseInt(p) + 1)
               qu += 1
               colorContext.setAdd(p=>!p)
           }else{
                 if(qu == 1) return
               //  setQut(p=>parseInt(p) - 1)
                 qu -= 1
                colorContext.setAdd(p=>!p)
           }
    }

   //         async function MuQu() {
   //        console.log('****************1');
   //      try {
   //         const res = await axios.post('http://localhost:5600/api/addQu',{token:window.localStorage.getItem('token'),pro:{Titel:Titel,price:Price,image:Image,qu:parseInt(qut)-1 }})
   //         console.log(res);
   //       //   colorContext.setRelode(p=>!p)
   //      } catch (err) {
   //         console.log(err);
   //      }
   //  }



     return(
       <div style={{color:'black'}}>
             <div style={{display:'flex',justifyContent:'space-between',width:'100%',height:'60px'}}>
                {/* <div style={{alignSelf:'center'}}>{Titel}</div> */}
                <div style={{alignSelf:'center'}}><img src={Image} alt=""  style={{width:'50Px',height:'50px',borderRadius:'10px'}}/></div>
                
                <div style={{display:'flex',justifyContent:'center',alignSelf:'center',gap:'10px'}}>
                    <div onClick={()=>{
                      Qu('Munis')
                      colorContext.setAdd(p=>!p)
                    }} className="BoxOfQu Mu" style={{background:backColor,color:fontColor,cursor:'pointer'}}>-</div>
                    <div className="BoxOfQu" style={{background:backColor,color:fontColor}}>{qu}</div>
                    <div onClick={()=>{
                      Qu('Plus')
                      colorContext.setAdd(p=>!p)
                    }} className="BoxOfQu" style={{background:backColor,color:fontColor,cursor:'pointer'}}>+</div>
                </div>


                <div style={{alignSelf:'center'}}>{Price}$</div>

                <div style={{alignSelf:'center'}} onClick={deletFroCaret}>
                    <FontAwesomeIcon icon={faSquareMinus} style={{color:'red',cursor:'pointer'}} />
                </div>

           </div>
           
       </div>
     )
}