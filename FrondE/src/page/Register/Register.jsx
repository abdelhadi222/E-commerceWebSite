import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import axios from "axios"
import "../Login/Login.css"
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {Color}  from "../../context/Color.jsx"
import { useState } from "react";
export default function Register() {
     let colorContext =  useContext(Color)
     let [phone,setPhone] = useState('')
   const [data,setdata] = useState({
       FirstName:'',
       LasteName:'',
       Email:'',
       ville:'',
       password:'',
   })

   let [er,setEr] = useState('')

   function remplidata(e) {
       setdata({...data,[e.target.name]:e.target.value})
   }

     
   async function sub(e){
          e.preventDefault() ;
       try {
         const res = await axios.post('http://localhost:5600/api/Register',{data:data,phone:phone})
         console.log(res);

         if(res.data == "Email Is Ready Exsit") {
            return setEr(res.data)
         }
              window.localStorage.setItem('token',res.data.token)
              window.location.pathname = "/"
         
       } catch (err) {
          console.log(err);
       }
   }
   
    let nav = useNavigate()


    let backColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back
   let boxColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Box
    let fontColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Font
     return(
        <div className="LoginMAin" style={{background:backColor,color:fontColor}}>
              <div className="BoxLogin" style={{background:boxColor}}>
                 <form action="" onSubmit={sub}>
                     <div style={{textAlign:'center' , position:'relative'}}>
                      <h3>Creat Account Here</h3>
                      <button onClick={()=>nav('/login')} style={{position:'absolute',left:'0px',top:'0px',padding:'5px',color:fontColor,background:backColor,border:'none',borderRadius:'10px',cursor:'pointer'}}><FontAwesomeIcon icon={faArrowLeft} size="xl" style={{marginRight:'10px'}} />Back</button>
                 </div>

                <div style={{textAlign:'center',marginTop:'20Px',marginBottom:'10px'}}>
                  <label htmlFor=""></label>
                  <input type="text" className="INP" placeholder="First Name" name="FirstName"  value={data.FirstName} onChange={remplidata}/>
                 </div>

                 <div style={{textAlign:'center',marginTop:'20Px',marginBottom:'10px'}}>
                    <label htmlFor=""></label>
                    <input type="text" className="INP" placeholder="Laste Name" name="LasteName"  value={data.LasteName} onChange={remplidata}/>
                 </div>

                 <div style={{textAlign:'center',marginTop:'20Px',marginBottom:'10px'}}>
                  <label htmlFor=""></label>
                  <input type="email" className="INP" placeholder="Email" name="Email" value={data.Email} onChange={remplidata} />
                 </div>

                     <PhoneInput country="us" className='phone' style={{color:'black'}} value={phone} onChange={(e)=>setPhone(e)} 
                        /> 
        
                  <div style={{textAlign:'center',marginTop:'20Px',marginBottom:'10px'}}>
                  <label htmlFor=""></label>
                  <input type="text" className="INP" placeholder="Ville" name="ville" value={data.ville} onChange={remplidata} />
                 </div>
                    
                   

                 <div style={{textAlign:'center'}}>
                    <label htmlFor=""></label>
                    <input type="password" className="INP" placeholder="Password" name="password" value={data.password}  onChange={remplidata} />
                 </div>


                   <div style={{textAlign:'center',marginTop:'10px'}}>
                     <button className="BuLogin" style={{background:backColor,color:fontColor}}>Register</button> 
                   </div>
                   {er == 'Email Is Ready Exsit' && <p>Email Is Ready Exsit</p>}
                  </form>
              </div>
        </div>
     )
}