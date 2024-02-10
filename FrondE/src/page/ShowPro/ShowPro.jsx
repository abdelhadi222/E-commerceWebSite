import { useContext, useEffect, useRef, useState } from "react";
import NavBar from "../../Compente/NavBar/NavBar";
import axios from "axios";
import { Color } from "../../context/Color";
import { motion } from "framer-motion"
import "../ShowPro/ShowPro.css"

export default function ShowPro() {
    let [pro,setPro] = useState({})
     let [num,setNum] = useState(0)
       let [wt,setWt] = useState(0)
        let [wa,setWa] = useState(false)
    let colorContext = useContext(Color)

    let idPro = window.location.href.replace('http://localhost:5173/shwoP/','')
    console.log('Pro Peo pe ',idPro);

    useEffect(()=>{
        getPro()
    },[])

    async function getPro() {
        try {
             const res = await axios.post('http://localhost:5600/api/getProById',{idPro:idPro})
             console.log(res);
             setPro(res.data.Pro)
             setWa(true)

        } catch (err) {
            console.log(err);
        }
    }

    let slideRef = useRef()
    useEffect(()=>{
        if( slideRef.current){
            setWt(slideRef.current.scrollWidth - slideRef.current.offsetWidth)
            console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
        }
    },[])
    // style={{background:`url(${Array.isArray(pro.Images)&&pro.Images[num]})`}}
    let date =  wa && pro.creat.slice(0,10)
    let time = wa && pro.creat.slice(11,19)


   let backColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back
   let boxColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Box
    let fontColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Font

    return(
        <div style={{background:backColor,color:fontColor,width:'100%',height:"100%",paddingBottom:'40px'}}>
            <NavBar/>
              {/* Slider With Click */}
            <div>
                 <div className="firstIma" >
                      <img src={Array.isArray(pro.Images)&&pro.Images[num]} alt="" style={{borderRadius:'10px',width:'100%',height:'100%'}} />
                 </div>

                 <div style={{display:'flex',gap:'20px',justifyContent:'center',marginBottom:'20px'}}>
                     {Array.isArray(pro.Images) && pro.Images.length > 0 &&  pro.Images.map((e,i)=>{
                        return <div key={i} className="OneIma" onClick={()=>setNum(i)}>
                            <img className="bor" src={e} alt="" style={{borderRadius:'10px',width:'100%',height:'100%',border:i==num?`2px solid ${boxColor}`:''}} />
                        </div>
                     })
                     }
                 </div>
            </div>

            {/* Ather Slider =>  */}

         {/* {Array.isArray(pro.Images) && pro.Images.length > 0 &&  pro.Images.length > 1  ?
           <motion.div ref={slideRef} className="Motion">
              <motion.div  drag='x' dragConstraints={{right:0,left:-wt}} style={{display:'flex',gap:'20px',width:'50%'}}>
                 {Array.isArray(pro.Images) && pro.Images.length> 0 &&
                   pro.Images.map((e,i)=>{
                     return <motion.div key={i} >
                          <img src={e} alt="" style={{width:'300Px',height:"200px",borderRadius:'10px',pointerEvents:'none'}} />
                     </motion.div>
                   })
                 }
              </motion.div>
            </motion.div>:
            <div style={{display:'flex',justifyContent:'center',width:'100%'}}>
                <img src={pro.Image} alt="" style={{margin:'20px auto',borderRadius:'10px',width:'330Px',height:'200px'}} />
            </div>
         } */}

         <div className="write" style={{background:boxColor}}>
             <div style={{display:'flex',justifyContent:"space-between"}}>
                 <div><h2>Titel : {pro.Titel}</h2></div>
                 <div><h2>Catrecory : {pro.cat}</h2></div>
             </div>

             <div style={{margin:'35px 0',height:'fit-content'}}>
                <h3 style={{marginBottom:'10px'}}>Descrption :</h3>
                <p>{pro.des}</p>
             </div>

             
               <div>
                 <h3 style={{marginBottom:'5px'}}>Price</h3>
                 <p>{pro.price} $</p>
               </div>

               <div  style={{display:'flex',justifyContent:'space-between',marginTop:'20px'}}>
                  <div><h3 style={{textAlign:'center',marginBottom:'5Px'}}>Time</h3> <p>{time}</p></div>
                  <div><h3 style={{textAlign:'center',marginBottom:'5Px'}}>Date</h3> <p>{date}</p></div>
              </div>
         </div>


           
             
        </div>
    )
}