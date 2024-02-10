import NavBar from "../../Compente/NavBar/NavBar";
import { useContext, useEffect, useState } from "react";
import {Color}  from "../../context/Color.jsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCircleCheck , faHeartCircleExclamation} from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
import "../Fav/Fav.css"
import axios from "axios";
import BoxPro from "../../Compente/NavBar/BoxPro/BoxPro.jsx";
export default function Fav() {
    let colorContext = useContext(Color)
    let [allFav,setAllFav] = useState([])
     let [relode,setRelode] = useState(false)

    useEffect(()=>{
       GetFav()
    },[relode])

  async  function GetFav() {
    if(!window.localStorage.getItem('token')){
         return
      }
        try {
            const res = await axios.post('http://localhost:5600/api/getFav',{
                token:window.localStorage.getItem('token')
            })
            console.log(res);
            setAllFav(res.data.AllFav)
        } catch (err) {
            console.log(err);
        }
    }




    let backColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back
    let boxColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Box
    let fontColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Font

   return(
     <div className='Fav' style={{backgroundColor:backColor,width:"100%",height:"100%", paddingBottom:'40px', color:fontColor }}>
        <NavBar/>
        <div style={{textAlign:'center',padding:'20px'}}> <h1><FontAwesomeIcon icon={faHeartCircleCheck} style={{marginRight:'20Px'}} />Favorite</h1></div>

        <div>
              {
                Array.isArray(allFav) && allFav.length > 0 ?
                  <div className="chkiourBoxPro">
                      {
                         allFav.map((e,i)=>{
                              return <BoxPro key={i} Titel={e.Titel} Image={e.Image} images={e.Images} des={e.des}  cat={e.cat} price={e.price} idPro={e._id}  rr={setRelode} saved={e.saved} />
                         })
                      }
                  </div>
                  :<div className="Nofav" style={{background:boxColor,color:fontColor}}><p> <FontAwesomeIcon icon={faHeartCircleExclamation} style={{marginRight:'10px'}} size="2xl" />You have Not Prouduct Favorite</p></div>
              }
              

        </div>

     </div>
   )
}