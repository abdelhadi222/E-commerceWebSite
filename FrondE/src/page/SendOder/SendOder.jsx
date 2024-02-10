import NavBar from "../../Compente/NavBar/NavBar";
import { useContext, useEffect, useState } from "react";
import {Color}  from "../../context/Color.jsx"
import PhoneInput from 'react-phone-input-2'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import 'react-phone-input-2/lib/style.css'
import axios from "axios";
import "../SendOder/SendOder.css"
import { Link, useNavigate } from "react-router-dom";
export default function SendOder() {
    let colorContext = useContext(Color)
    let [user,setUser] = useState("")
    let [done,setDone] = useState(false)
     let [newDone,setNewDone] = useState(false)
     let [email,setEmail] = useState('')
      let [phone,setPhone] = useState('')
      let nav = useNavigate()
      let [errCom,setErrCom] = useState([])     
       let [mesa,setMesa] = useState(false)
      let [errComBol,setErrComBol] = useState(false)

    useEffect(()=>{
        getUser()
    },[colorContext.add])

    // useEffect(()=>{
    //   if(user.carte.length  == 0){
    //     nav('/')
    //   }
    // },[])
   

     async function getUser() {
        if(!window.localStorage.getItem('token')){
            return
        }
        try {
            const res = await axios.post('http://localhost:5600/api/getUser',{token:window.localStorage.getItem('token')}) 
            setUser(res.data.User)
            setEmail(res.data.User.Email)
            setPhone(res.data.User.phone)
        } catch (err) {
           
            console.log(err);
        }
    }
  

    let mainComnde =  Array.isArray(user.carte) && user.carte.length > 0 ?
                             user.carte.map((e,i)=>{
                               return <div key={i} style={{display:'flex',justifyContent:'space-between',marginBottom:'15px'}}>
                                     <div className="KKL">
                                        <img src={e.image} alt="" style={{width:'30px',height:'30px',borderRadius:'10px'}} />
                                     </div>

                                     <div className="KKL">
                                        <p>{e.Titel}</p>
                                     </div>

                                     <div className="KKL">
                                        <p>{e.qu}</p>
                                     </div>

                                     <div className="KKL">
                                        <p>{e.price}</p>
                                     </div>

                                     <div className="KKL">
                                        <p>{parseInt(e.qu) * parseInt(e.price)}</p>
                                     </div>

                                 </div>
                               
                           }):''


            async function ShowConfirmationOFEmailPhone() {
                document.querySelector('.AllOrde').classList.add('P')
                setDone(true)
            }

            let [idCom,setIdCom] = useState('')

            async function CreatCommend() {
                try {
                    const res = await axios.post('http://localhost:5600/api/creatComend',{
                        token:window.localStorage.getItem('token'),
                        total:colorContext.totel,
                        product:user.carte,
                        idRe:colorContext.color[0].idUser
                    })
                    console.log(res);
                    if(res.data.errCom.length > 0) {
                           setDone(false)
                           setErrComBol(true)
                           console.log('HGDHEGDD' , res.data.errCom);
                           setErrCom(res.data.errCom)
                           document.querySelector('.AllOrde').classList.add('P')
                           colorContext.setNot(p=>!p)
                        //    setMesa(res.data.message)

                        let ar  = res.data.errCom.filter((e)=>{
                             return e.end 
                        })

                        if(ar.length == res.data.errCom.length ) {setMesa(true)}




                           return
                    }
                      console.log("+ + + + + " , res.data.idCom);
                      colorContext.setNot(p=>!p)
                      setNewDone(true)
                      setDone(false)
                      Sokett(100,res.data.num)
                    
                } catch (err) {
                    console.log(err);
                }
            }

            async function ConfiNumAndEmail() {
                try {
                    const res = await axios.post('http://localhost:5600/api/ConfiNumAndEmail',{
                        phone:phone,
                        email:email,
                        token:window.localStorage.getItem('token')
                    })
                    console.log(res);
                        // setNewDone(true)
                        // setDone(false)
                        CreatCommend()
                        

                    // nav('/')
                } catch (err) {
                    console.log(err);
                }
                
            }


        function Sokett(type,num) {
         colorContext.socket.emit('sendNotiComen',{
                  senderId:user._id,
                  reciverId:colorContext.color[0].idUser,
                  idComAdmin:num,
                  message:"creta Comend",
                  type:type,
              })
      }




            function canel() {
              document.querySelector('.AllOrde').classList.remove('P')
              setDone(false)
            }

              async function confrimiToAddCommend() {

                //  if(errCom.length >  0) {
                //      for (let i = 0; i < errCom.length; i++) {
                //           for (let j = 0; j < user.carte.length; j++) {
                //             const element = array[j];
                            
                //           }
                //      }
                //  }


                try {
                    const res = await axios.post('http://localhost:5600/api/confrimiToAddCommend',{
                        token:window.localStorage.getItem('token'),
                        total:colorContext.totel,
                        product:user.carte,
                        err:errCom,
                        idAdmin:colorContext.color[0].idUser
                    })
                    console.log(res);
                    document.querySelector('.AllOrde').classList.add('P')
                    nav('/')
                
                        setErrComBol(false)
                       
                    
                } catch (err) {
                    console.log(err);
                }
            }

            


     let backColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back
    let boxColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Box
    let fontColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Font
     return(
         <div className="AllOrde" style={{backgroundColor:backColor, width:"100%",height:'100%', color:fontColor }}>
             <NavBar/>

             <div className="AllBoxComend">
                <div className="BoxComend" style={{background:boxColor,color:fontColor}}>
                    <h2 style={{textAlign:'center',padding:'10px'}}>Commend N° {user.numCom + 1}</h2>
                    
                    <div style={{padding:'10px'}}>
                        <p style={{marginBottom:'10px'}}>Client : {user.First} {user.Laste} </p>
                        <p> Store : {Array.isArray(colorContext.color)&&colorContext.color.length > 0 && colorContext.color[0].name}</p>
                    </div>

                    <div style={{padding:'10px' , width:'100%'}}>
                         <h3 style={{textAlign:'center',margin:'30Px 0'}}>Product :</h3>

                         <div className="df" style={{display:'flex',justifyContent:'space-between', width:'100%',marginBottom:'20px'}}>
                             <div >Image</div>
                             <div>Titel</div>
                             <div>Quantity</div>
                             <div>Price unit</div>
                             <div>price </div>
                         </div>

                         {mainComnde}

                    </div>

                 <div style={{display:'flex',justifyContent:'space-between',padding:'40px'}}>
                      <div style={{width:'fit-content',background:backColor,padding:'6px',borderRadius:'7Px'}}>Total : {colorContext.totel} $ </div>
                      <button className="Orde" style={{background:backColor,color:fontColor}} onClick={ShowConfirmationOFEmailPhone}>Confrmation Orde</button>
                 </div>

                </div>
             </div>

             {done && !newDone && 
               <div className="DoneComend">
                  <p style={{margin:'10px 20px'}}>Your Order Has Been Sent Successfully , please check Your Email and Phone so we can contat you about Your Order </p>
                  <input type="email" placeholder="Email" className="orderInput"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
                  <PhoneInput country="us" className='phone' style={{color:'black'}} value={phone} onChange={(e)=>setPhone(e)} 
                        /> 

                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <button onClick={canel}>Canel</button>
                            <button onClick={ConfiNumAndEmail}>Confirmtion</button>
                        </div>
                  
               </div>
             }

             {
                !done && newDone &&
                  <div className="DoneComend">
                     <div>Confirmed Successfully <FontAwesomeIcon icon={faCircleCheck} size="xl" style={{color:'green'}} /></div>
                    <button className="retunOfHome" onClick={()=>window.location.pathname = '/'}>Oky</button>
               </div>

             }

             {errComBol  &&
               <div className="BoxQu">
                    {errCom.length > 0 && errCom.map((e,i)=>{
                        return <div key={i} style={{color:'black',marginBottom:'20px'}}>
                             <div style={{display:'flex',gap:'10px',background:boxColor,color:fontColor,padding:'10px',borderRadius:'10px'}}>
                                <img src={e.ima} alt="" style={{width:'50Px',height:'50px',borderRadius:'50%'}} />
                                <p>{e.err}</p>
                             </div>
                        </div>
                    })
                    }
                    <div className="BUConfiCOM">
                         {!mesa ?<button style={{background:boxColor,color:fontColor}} onClick={confrimiToAddCommend}>Complete the order</button>:''}
                        <button style={{background:boxColor,color:fontColor}} onClick={()=>{
                             document.querySelector('.AllOrde').classList.add('P')
                             setErrComBol(false)
                             nav('/')
                        }}>Ending the order</button>
                    </div>
               </div>
             }


         </div>
     )
}