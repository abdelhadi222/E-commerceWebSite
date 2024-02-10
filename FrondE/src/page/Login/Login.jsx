import "../Login/Login.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faCircleUser} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import {Color}  from "../../context/Color.jsx"

export default function Login() {
  let [email,setEmail] = useState('')
  let [password,setpassword] = useState('')
  let [user,setUser] = useState('')
  let [welcome,setWelcome] = useState('')
  let nav = useNavigate()

  let colorContext =  useContext(Color)
 async function sup(e) {
   e.preventDefault() ;
     try {
       let res = await axios.post('http://localhost:5600/api/Login',{
           Email:email,
           password:password
           
       })
       console.log('Login => ',res); 
       if(typeof res.data == "object") {
         setWelcome(true)
         window.localStorage.setItem('token',res.data.token)
         setUser(res.data.User)
         nav('/')
         return
       }
     } catch (err) {
        console.log(err);
     }
  }

   let backColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back
   let boxColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Box
    let fontColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Font
    return(
        <div className="LoginMAin" style={{background:backColor}}>
              <div className="BoxLogin" style={{background:boxColor,color:fontColor}}>
                {welcome && <div className="logout">Your Connecedt Sure !! </div>}
                  <form action="" onSubmit={sup}>
                     <div style={{textAlign:'center'}}>
                      <h3>Have Fun Shopping</h3>
                      <FontAwesomeIcon icon={faCircleUser} style={{marginTop:'20px',fontSize:'50px',color:fontColor}}  />
                 </div>

                 <div style={{textAlign:'center',marginTop:'20Px',marginBottom:'10px'}}>
                  <label htmlFor=""></label>
                  <input type="text" className="INP" placeholder="Email" value={email} onChange={((e)=>setEmail(e.target.value))} />
                 </div>

                 <div style={{textAlign:'center'}}>
                    <label htmlFor=""></label>
                    <input type="password" className="INP" placeholder="Password"  onChange={((e)=>setpassword(e.target.value))}/>
                 </div>


                 <div style={{display:'flex',justifyContent:"space-between",marginTop:'15px',marginBottom:'15px'}}>
                   <Link to={`/register`} style={{color:fontColor}}>Creat Account</Link>
                   <Link  style={{color:fontColor}}>Forget Password</Link>
                 </div>

                   <div style={{textAlign:'center',marginTop:'10px'}}>
                     <button className="BuLogin" style={{background:backColor}}>Login</button> 
                   </div>
                  </form>
              </div>
        </div>
    )
}