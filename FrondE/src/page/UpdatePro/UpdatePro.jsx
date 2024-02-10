import { useContext, useEffect, useState } from "react";
import NavBar from "../../Compente/NavBar/NavBar";
import {Color}  from "../../context/Color.jsx"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib} from "@fortawesome/free-solid-svg-icons";

export  function UpdatePro() {
     let colorContext = useContext(Color)

     let [titel,setTitel] = useState('')
     let [des,setDes] = useState('')
     let [price,setPrice] = useState('')
     let [qu,setQu] = useState('')
     let [cat,setCat] = useState('')
     let [image,setImage] = useState([])

     let idPro =  window.location.href.replace('http://localhost:5173/stock/','')
     console.log(idPro);

     useEffect(()=>{
      GetOnePro()
     },[])

     async function GetOnePro() {
          try {
              const res = await   axios.post('http://localhost:5600/api/getProById',{idPro:idPro})
              console.log(res);
               setTitel(res.data.Pro.Titel)
               setDes(res.data.Pro.des)
               setPrice(res.data.Pro.price)
               setQu(res.data.Pro.qu)
               setCat(res.data.Pro.cat)
               setImage(res.data.Pro.Images)
          } catch (err) {
               console.log(err);
          }
     }



    let backColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back
    let boxColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Box
    let fontColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Font

     return(
        <div style={{width:'100%',height:'100vh',background:backColor,color:fontColor}}>
             <NavBar/>
             <h2 style={{padding:'10px',marginTop:'30px',textAlign:'center'}}> <FontAwesomeIcon icon={faPenNib} style={{marginRight:'20px'}} />Update product {titel}</h2>

              <div>
                    
              </div>


        </div>
     )
}