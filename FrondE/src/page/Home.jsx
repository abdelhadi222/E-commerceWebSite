import { useContext, useEffect, useState , useRef } from "react";
import NavBar from "../Compente/NavBar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft , faArrowAltCircleDown , faMagnifyingGlassPlus , faShop, faHeart, faBookmark} from "@fortawesome/free-solid-svg-icons";
import "../App.css"
import axios from "axios";
import {Color} from "../context/Color.jsx"
import "../page/Home.css"
import { Await } from "react-router-dom";
import BoxPro from "../Compente/NavBar/BoxPro/BoxPro.jsx";
import { text } from "@fortawesome/fontawesome-svg-core";
export  default function Home() {


          let [showMeunPro,setShowMeunPro] = useState(false)
          let [cat,setCat] = useState('Select Your Cat')
          let [relode,setRelode] = useState(false)
          let [pro,setPro] = useState([])
          let [proCat,setProCat] = useState([])
          let [inputValue,setInputValue] = useState('')
          let [test,setTest] = useState(false)
          let [user,setUser] = useState(false)
         

            let colorContext = useContext(Color)

            useEffect(()=>{
               getAllPro()
            },[relode,colorContext.add])

            console.log('µµµµµ' , colorContext.relode);

   

    async function getAllPro() {
      try {
         const res = await axios.get('http://localhost:5600/api/getAllPro')
         console.log("=> Pro => ",res.data.AllPro);
         setPro(res.data.AllPro)
      } catch (err) {
          console.log(err);
      }
    }



      async function getProByCat() {
         if(cat =='' || cat == 'Select Your Cat') {
           return alert('Enter You Fucking Cat')
         }
      try {
         const res = await axios.post('http://localhost:5600/api/getByCat',{cat:cat})
         console.log('Is Nul ',res.data.ProCat);
         setTest(true)
         if(!res.data.ProCat || res.data.ProCat.length == 0) return 
         setProCat(res.data.ProCat)
         setRelode(p=>!p)
         
         ScrolFun()
         
      } catch (err) {
          console.log(err);
      }
    }

    let ArTest = inputValue != "" && proCat.length > 0 && proCat.filter((e)=>{
       return e.Titel.toLowerCase().includes(inputValue.trim().toLowerCase())
    })


    console.log('New ArTest => Voire => ' , ArTest );

    // let scrolref = useRef()

    function ScrolFun() {
     window.scrollTo({
      top:430,
      behavior:'smooth'
     })
    }

    useEffect(()=>{
          getUser()
    },[colorContext.add])



         async function getUser() {
        if(!window.localStorage.getItem('token')){
            return
        }
        try {
            const res = await axios.post('http://localhost:5600/api/getUser',{token:window.localStorage.getItem('token')}) 
            setUser(res.data.User)
            colorContext.setCarte(res.data.User.carte)
        } catch (err) {
           
            console.log(err);
        }
    }
  


    



   let backColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back
   let boxColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Box
    let fontColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Font
    return(
         <div className="Home" style={{color:window.localStorage.getItem('Font')?window.localStorage.getItem('Font'): Array.isArray(colorContext.color) && colorContext.color.length != 0  && colorContext.color[0].Font,height:'100%', backgroundColor: window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color)  &&  colorContext.color.length > 0  &&colorContext.color[0].Back}}>
            <NavBar/>


            <section className="Up" style={{background:Array.isArray(colorContext.color) && colorContext.color.length > 0  && `url(http://localhost:5600/${colorContext.color[0].imageCov})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center center'}}>
                <div className="BoxSearch">
                      <div style={{display:'flex',gap:'10px'}}>
                        <input type="text" name="" id="" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />
                        <div className="SeerchIcon" style={{alignSelf:'center',marginTop:'100px'}} onClick={getProByCat}><FontAwesomeIcon icon={faMagnifyingGlassPlus} /></div>
                      </div>

                    

                      <div>
                        <div className="ContiOfSelectt" style={{borderRadius:'10px'}}>

                              <div  onClick={()=>setShowMeunPro(p=>!p)} style={{display:'flex',justifyContent:'space-between',gap:'10px',alignItems:'center',color:'black',padding:'3px'}}>
                                   <div style={{marginTop:'7px'}}>{cat}</div>
                                   <div  style={{marginTop:'7px'}} >{showMeunPro?<FontAwesomeIcon icon={faArrowAltCircleLeft} /> :<FontAwesomeIcon icon={faArrowAltCircleDown} />}</div>
                              </div>
                         
                              
                                 
                                 {showMeunPro &&
                                   <div className="MeunWhitee">
                                      {colorContext.color.length > 0 && colorContext.color[0].cat.map((e,i)=>{
                                       return  <div value={cat} key={i} className="OneOfCat" onClick={(e)=>{
                                          setCat(e.target.innerHTML)
                                          console.log(e.target.innerHTML);
                                          setShowMeunPro(p=>!p)
                                          setRelode(p=>!p)
                                       }}>{e}</div>
                                   })}
                                   </div>
                                 }



                            </div>
                      </div>

                </div>
            </section>

            
            <section>
                <div style={{display:'flex',justifyContent:'center',paddingTop:'30px',paddingBottom:'20px'}}>
                     <h1> <FontAwesomeIcon icon={faShop} style={{marginRight:'10px'}} />All Product </h1>
                </div>


              {  Array.isArray(proCat) && proCat.length > 0 && inputValue == "" ?
                    <div className="chkiourBoxPro">
                        {
                          proCat.map((e ,i )=>{
                            return <BoxPro key={i} Titel={e.Titel} Image={e.Image} images={e.Images} des={e.des}  cat={e.cat} price={e.price} idPro={e._id}  rr={setRelode} saved={e.saved} />
                          })
                        }
                      </div>
                  :test && ArTest.length == 0?<div className="forNotFound" style={{background:boxColor,color:fontColor}}>This Product Is Not Found </div>:''
              }

              {
                Array.isArray(ArTest) && ArTest.length > 0 && inputValue != "" && 
                  <div className="chkiourBoxPro">
                      {
                         ArTest.map((e,i)=>{
                              return <BoxPro key={i} Titel={e.Titel} Image={e.Image} images={e.Images} des={e.des}  cat={e.cat} price={e.price} idPro={e._id}  rr={setRelode} saved={e.saved} />
                         })
                      }
                  </div>
              }

          


              <div className="chkiourBoxPro">
                {
                  Array.isArray(pro)&& pro.length > 0 && proCat.length == 0 && !test &&  pro.map((e,i)=>{
                      return <BoxPro key={i} Titel={e.Titel} Image={e.Image} images={e.Images} des={e.des}  cat={e.cat} price={e.price} idPro={e._id}  rr={setRelode} saved={e.saved} />
                  })
                  
                }
                </div>


                {/* <div className="chkiourBoxPro">
                     { Array.isArray(pro) &&pro.length> 0 && pro.map((e,i)=>{
                         return  <div className="boxPro" key={i}>
                                  <div style={{background:`url(${e.Image})`,borderRadius:'10px 10px 0 0 ',width:'100%',height:'200px',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
                                      <div style={{position:"absolute",color:'black',display:'flex',gap:'10px',margin:"10px",right:'0',top:'0px'}}>
                                         <div className="IconProUp" style={{background:boxColor,color:fontColor}}><FontAwesomeIcon icon={faHeart} /></div>
                                         <div  className="IconProUp" style={{background:boxColor,color:fontColor}}><FontAwesomeIcon icon={faBookmark} /></div>
                                      </div>
                                  </div>

                                  <div>
                                     <div style={{display:'flex',justifyContent:'space-between',marginTop:'5px',padding:'4px'}}>
                                         <h3>  {e.Titel}</h3>
                                         <h3>category : {e.cat}</h3>
                                     </div>
                                  </div>

                                  <div style={{margin:'20px 10px'}}>
                                     <h3 style={{marginBottom:'10px'}}>Descprition</h3>
                                     <p>{e.des}</p>
                                  </div>

                                  <div style={{margin:'20px 10px' ,display:'flex',justifyContent:'space-between'}} >
                                     <div>
                                       <h3 style={{marginBottom:'5px'}}>Price</h3>
                                       <p>{e.price}Da</p>
                                     </div>

                                     <div style={{alignSelf:'center'}}>
                                       <button>Add To Carte</button>
                                     </div>
                                  </div>
                         </div>
                     })}
                </div> */}

            </section>

           
           

         </div>
    )
}