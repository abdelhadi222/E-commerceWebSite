import NavBar from "../../Compente/NavBar/NavBar";
import { useContext, useEffect, useState } from "react";
import {Color}  from "../../context/Color.jsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoiceDollar ,faTrashArrowUp} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../MyCom/MyCom.css"
export default function MyCom() {
    let colorContext = useContext(Color)
    let [allCom, setAllCom] = useState([])
     let [confi, setConfi] = useState(false)
     let [relode, setRelode] = useState(false)
     let [idDelet, setIdDelet] = useState('')
     let [idUp, setIdUp] = useState('')
     let [showcaln, setShowcaln] = useState('')
     let [idUserCnx,setIdUserCnx] = useState('')

    useEffect(()=>{
       getCommend()
    },[relode , colorContext.not])

    async function getCommend() {
      if(!window.localStorage.getItem('token')){
         return
      }
        try {
            const res = await axios.post('http://localhost:5600/api/getCommend',{
              token:window.localStorage.getItem('token'),
            })
            console.log('com => =====',res.data.AllCom);
            setAllCom(res.data.AllCom)
            setIdUserCnx(res.data.idUser)
        } catch (err) {
            console.log(err);
        }
    }


    function confirmationToDelet(id) {
        document.querySelector('.MyOr').classList.add('P')
        setConfi(true)
        setIdDelet(id)
    }


    
        function Sokett(type,num) {
         colorContext.socket.emit('sendNotiComen',{
                  senderId:idUserCnx,
                  reciverId:colorContext.color[0].idUser,
                  idComAdmin:num,
                  type,
              })
      }


   async function delteConfiById() {

         try {
            const res =  await axios.post('http://localhost:5600/api/deletComById',{
                idCom:idDelet,
                idS:idUserCnx,
                idR:colorContext.color[0].idUser,

            })
            console.log(res.data);

            document.querySelector('.MyOr').classList.remove('P')
            setConfi(false)
            setRelode(p=>!p)
            Sokett(10,res.data.num)
         } catch (err) {
            console.log(err);
         }
    }

    async function clientConfir(idC) {
          try {
            const res = axios.post('http://localhost:5600/api/clientConfir',{
                idCom:idC,
                idR:colorContext.color[0].idUser,
                idS:idUserCnx
            })
            console.log(res);
            setRelode(p=>!p)
            Sokett(30,(await res).data.num)
         } catch (err) {
            console.log(err);
         }
    }

    function caln(id) {
      document.querySelector('.MyOr').classList.add('P')
      setShowcaln(true)
      setIdUp(id)
    }

   async function updateRt() {
      try {
          const res = await axios.post('http://localhost:5600/api/rt',{
            idCom:idUp,
            idR:colorContext.color[0].idUser,
            idS:idUserCnx
         })
          console.log(res);
          setShowcaln(false)
           document.querySelector('.MyOr').classList.remove('P')
          setRelode(p=>!p)
          Sokett(20,res.data.num)
      } catch (err) {
          console.log(err);
      }
    }

    let backColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back
    let boxColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Box
    let fontColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Font
    return(
        <div className="MyOr" style={{paddingBottom:'100Px',backgroundColor:backColor,width:"100%",height:allCom.length == 0 ?'100vh':"100%", color:fontColor }}>
            <NavBar/>
            <h1 style={{padding:'20px',textAlign:'center'}}> <FontAwesomeIcon className="IconNavBar" icon={faFileInvoiceDollar} style={{marginRight:'10px',fontSize:'32px'}} />My order</h1>

            <div style={{margin:'10px 20px' ,display:'flex',gap:'20px',flexDirection:'row',flexWrap:'wrap'}}>
              {
                Array.isArray(allCom) && allCom.length > 0 ?
                 allCom.map((e,i)=>{
                    return <div key={i}  className="BoxOfOneComend" style={{background:boxColor,color:fontColor}}>
                        {e.isDoneFromAdmin && !e.isDoneFromClient && !e.rt &&<div className="TrueFromAdmin">On My Way</div> }
                        {!e.isDoneFromAdmin && <div className="AttDeConfirmComend">Waiting For Products to be sent</div>}
                        {e.isDoneFromAdmin && e.isDoneFromClient && <div className="TrueFromAdmin">Comend Done !</div>  }
                         {e.rt  && <div className="red">Retour</div>  }
                        <h4 style={{textAlign:'center',margin:'10px 20px'}}>commend N° {e.numUser}</h4>
                        <p>store : {Array.isArray(colorContext.color)&&colorContext.color.length > 0 && colorContext.color[0].name}</p>
                        <h3 style={{margin:'30px 20px',textAlign:'center'}}>Product</h3>

                        <div className="df" style={{display:'flex',justifyContent:'space-between', width:'100%',marginBottom:'20px',marginTop:'20px'}}>
                             <div >Image</div>
                             <div>Titel</div>
                             <div>Qu</div>
                             <div>Price unit</div>
                             <div>price </div>
                         </div>

                        {e.Pro.map((el,indx)=>{
                           return <div key={indx}>
                                   <div  style={{display:'flex',justifyContent:'space-between',marginBottom:'15px'}}>
                                     <div className="KKL">
                                        <img src={el.image} alt="" style={{width:'30px',height:'30px',borderRadius:'10px'}} />
                                     </div>

                                     <div className="KKL">
                                        <p>{el.Titel}</p>
                                     </div>

                                     <div className="KKL">
                                        <p>{el.qu}</p>
                                     </div>

                                     <div className="KKL">
                                        <p>{el.price}</p>
                                     </div>

                                     <div className="KKL">
                                        <p>{parseInt(el.qu) * parseInt(el.price)}</p>
                                     </div>

                                 </div>
                           </div>
                        })}

                        <div style={{marginTop:'30PX',width:'100%',padding:'10px',background:backColor,borderRadius:"10px", display:'flex', justifyContent:"space-between" }}>
                            <div style={{height:'24px',alignSelf:'center',marginTop:'5px'}}>Totel : {e.Totel} $ </div>
                            <div >  { !e.isDoneFromClient && !e.rt && e.isDoneFromAdmin && <div className="BuRe" onClick={()=>clientConfir(e._id)}><button style={{background:boxColor,color:fontColor}}>Been Received</button></div>}</div>
                            <div >  { !e.isDoneFromClient && !e.rt  &&e.isDoneFromAdmin && <div className="BuRe" onClick={()=>caln(e._id)}><button style={{background:boxColor,color:fontColor}}>cancellation</button></div>}</div>
                            <div style={{alignSelf:'center'}}> { !e.isDoneFromAdmin && <div className="deletCom" onClick={()=>confirmationToDelet(e._id)}><FontAwesomeIcon icon={faTrashArrowUp} shake color="red" /></div>}</div>
                         
                        </div>

                    </div>
                 })
                  
                 
                :<div className="NotCom" style={{background:boxColor,color:fontColor}}> You have not Commend  </div>

                
              }
            </div>

            {showcaln && <div className="calne" >
                <h3>Are You sure To cancellation The Order</h3>
                 <div style={{display:"flex",justifyContent:'center',gap:'30px',marginTop:'20px'}}>

                   <button className="Bu yesBu" onClick={()=>updateRt()} style={{background:boxColor, color:fontColor}}>Yes</button>

                    <button className="Bu noBu" style={{background:boxColor , color:fontColor}} onClick={()=>{
                     document.querySelector('.MyOr').classList.remove('P')
                     setShowcaln(false)
                    }}>No</button>
                 </div>
               </div>}


              {confi &&
               <div className="confiDeleCOM" style={{background:backColor}}>
                  <h4 style={{textAlign:'center',marginTop:'20px'}}>Are You sure to canceled The Order</h4>
                  <div style={{display:'flex',gap:'10px',justifyContent:'center'}}>
                     <button className="ddd" style={{background:boxColor,color:fontColor}} onClick={delteConfiById}>Yes</button>
                     <button className="ddd" style={{background:boxColor,color:fontColor}} onClick={()=>{
                        document.querySelector('.MyOr').classList.remove('P')
                        setConfi(false)
                     }}>No</button>
                  </div>
               </div>
            }

          

        </div>
    )
}


{/* <div key={ind} className="BoxOfOneComend" style={{background:boxColor,color:fontColor}}>
                            <p style={{marginBottom:'30px', textAlign:'center'}}>N Commend 1 °</p>
                            <p>Store :  {Array.isArray(colorContext.color)&&colorContext.color.length > 0 && colorContext.color[0].name}</p>
                            <h3 style={{textAlign:'center',margin:'20px'}}>Product</h3>

                        <div className="df" style={{display:'flex',justifyContent:'space-between', width:'100%',marginBottom:'20px',marginTop:'20px'}}>
                             <div >Image</div>
                             <div>Titel</div>
                             <div>Qu</div>
                             <div>Price unit</div>
                             <div>price </div>
                         </div>

                         <div  style={{display:'flex',justifyContent:'space-between',marginBottom:'15px'}}>
                                     <div className="KKL">
                                        <img src={el.image} alt="" style={{width:'30px',height:'30px',borderRadius:'10px'}} />
                                     </div>

                                     <div className="KKL">
                                        <p>{el.Titel}</p>
                                     </div>

                                     <div className="KKL">
                                        <p>{el.qu}</p>
                                     </div>

                                     <div className="KKL">
                                        <p>{el.price}</p>
                                     </div>

                                     <div className="KKL">
                                        <p>{parseInt(el.qu) * parseInt(el.price)}</p>
                                     </div>

                                 </div>

                                 <div style={{marginTop:'30PX',width:'fit-content',padding:'10px',background:backColor,borderRadius:"10px"}}>
                                    <p>Totel : {e.Totel}</p>
                                 </div>
                               
                             
                       </div> */}