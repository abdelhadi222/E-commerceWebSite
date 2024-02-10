import NavBar from "../../Compente/NavBar/NavBar";
import { useContext, useEffect, useState } from "react";
import {Color}  from "../../context/Color.jsx"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faTrash , faPen} from "@fortawesome/free-solid-svg-icons";
import "../Sotck/Stock.css"

export default function Sotck() {

    let colorContext = useContext(Color)
    let [stock,setStock] = useState([])
    let [idDelet,setIdDelet] = useState('')
        let [relode,setRelode] = useState(false)

    useEffect(()=>{
       getStock()
    },[relode])

    async function getStock() {
        try {
            const res = await axios.get('http://localhost:5600/api/getStock')
            console.log( 'Srock = ',res);
            setStock(res.data.stock)
        } catch (err) {
            console.log(err);
        }
    }
    let [showConfiDelet,setShowConfiDelet] = useState(false)

    async function deletPro(id) {
         document.querySelector('.AllStock').classList.add('P')
         setShowConfiDelet(true)
         setIdDelet(id)
    }

        async function dle() {
           try {
             const res = await axios.post('http://localhost:5600/api/deletPro',{
                idP:idDelet
             })
             console.log(res);
 
             document.querySelector('.AllStock').classList.remove('P')
             setShowConfiDelet(false)
             setRelode(p=>!p)

           } catch (err) {
             console.log(err);
           }
    }





    let backColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back
    let boxColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Box
    let fontColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Font


    return <div className="AllStock" style={{width:'100%',height:'100vh',background:backColor,color:fontColor}}>
        <NavBar/>
         <h1 style={{ padding:'20px' , textAlign:'center',margin:'10px'}}> Stock Of Your Store </h1>
         <div style={{padding:'20px'}}>

              <div className="divOfOnePro" style={{background:boxColor,color:fontColor  , padding:'10Px'}}>
           <div>Image</div>
           <div>Titel</div>
           <div>Cat</div>
           <div>Qu</div>
           <div>price</div>
           <div>action</div>
        </div>
         <div style={{marginTop:'30px'}}>
            {stock.length> 0 && stock.map((e,i)=>{
                 return <div key={i} className="divOfOnePro" style={{background:boxColor,color:fontColor}}>
                     <div> <img src={e.image} alt=""  style={{marginTop:'-5px',width:'30px',height:'30px',borderRadius:'30Px'}}/></div>
                      <div><p>{e.titel}</p></div>
                      <div><p>{e.cat}</p></div>
                      <div><p>{e.qu}</p></div>
                      <div><p>{e.price} $ </p></div>
                      <div>
                         <FontAwesomeIcon icon={faTrash} style={{marginRight:"10px" , cursor:'pointer',color:'red'}} onClick={()=>deletPro(e.id)} />
                        <Link to={`${e.id}`}>  <FontAwesomeIcon icon={faPen} style={{ cursor:'pointer' , color:'green'}}/></Link>
                      </div>
                 </div>
            })}
         </div>
         </div>

         {showConfiDelet && 
           <div className="DeletPto">
              <h3>Are You sure To delet Your Pro</h3>
              <div  style={{display:'flex' ,justifyContent:'center',gap:'10px',marginTop:'25Px'}} >
                <button style={{background:boxColor ,  color:fontColor , cursor:'pointer'}} onClick={dle}>Yes</button>
                <button style={{background:boxColor, color:fontColor , cursor:'pointer'}} onClick={()=>{{
                    document.querySelector('.AllStock').classList.remove('P')
                    setShowConfiDelet(false)
                }}}>No</button>

              </div>
           </div>
         }

    </div>
}