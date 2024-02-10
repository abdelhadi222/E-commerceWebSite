import { useEffect, useState } from "react"
import "../../Carte/Carte.css"
import "../NavBar/NavBar.css"
import { Link, useNavigate } from "react-router-dom";
import  logoDefult from "../../Images/eco.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart , faCartPlus ,faHouse, faUser, faGears,faCirclePlus , faBox ,faFileInvoiceDollar , faCircleXmark ,faCommentDollar, faPowerOff ,faArrowRight} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useContext } from "react";
import {Color}  from "../../context/Color.jsx"
import Carte from "../../Carte/Carte.jsx";

export  default function NavBar() {
    // const {Car} = props    
     const [logo,setLogo] = useState("")
     const [validationUser,setValidationUser] = useState(false)
    const [name,setName] = useState("")
       const [car,setCar] = useState([])

        const [cats,setCats] = useState([])
        const [oneCat,setOneCat] = useState('')
        const [relode,setRelode] = useState(false)
        const [carte,setCarte] = useState([])
    
    const [welcome,setWelcome] = useState(false)
    const [test,setTest] = useState(true)
    const [loga,setLoga] = useState(false)
    const [toggelCarte,setToggelCarte] = useState("")
    const [user,setUser] = useState("")
    let [notiComend, setNotiComend] = useState([])
    let nav= useNavigate()

        let [noti100,setNoti100] = useState('')
    let [noti1,setNoti1] = useState('')
             
         let colorContext = useContext(Color)





useEffect(()=>{

    if(colorContext.socket == null || colorContext.socket.length < 1 ) return 
    
       colorContext.socket.on('getNotiComend',(data)=>{
         console.log('Data Sockt From Nav Bar =>=>=>' , data);
         setNotiComend((p)=>[...p,data])
         console.log('Loldodloddlodldod' , data);
         colorContext.setNot(p=>!p)
       })
   },[colorContext.socket])


   let fromAdmin = notiComend.filter((e)=>{
       return e.type = 1
   })


   
        //  useEffect(()=>{
            
        //  },[])
         
    useEffect(()=>{
       setLogo(window.localStorage.getItem('Logo'))
       setName(window.localStorage.getItem('Name'))
    },[])


   //  console.log('Color rrrrr ' ,   color.color.length > 0 && color.color[0].Box);

    useEffect(()=>{
         getUser()
    },[colorContext.add,relode])

    useEffect(()=>{
      getStore()
    },[colorContext.relode])
    
    function logout() {
      colorContext.setTog(false)
        window.localStorage.removeItem('token')
        setTest(p=>!p)
        setLoga(true)
        setTimeout(() => {
            document.querySelector('.logout').innerHTML =  " "
            document.querySelector('.logout').classList.remove('logout')
        }, 3000);
        window.location.pathname  = '/'
    }



    async function getStore() {   
        
         try {
            const res = await axios.get('http://localhost:5600/api/getStore')
            console.log('Store from top => ',res);
            setLogo(res.data.store.logo)
            setName(res.data.store.name)
         } catch (err) {
            console.log(err);
         }
    }

     async function getUser() {
        if(!window.localStorage.getItem('token')){
            return
        }
        try {
            const res = await axios.post('http://localhost:5600/api/getUser',{token:window.localStorage.getItem('token')}) 
            console.log( 'FRom Nav BAt => ', res.data);
            //  if(!res.data.User.isAdmin){}
            setValidationUser(res.data.check)
             setUser(res.data.User)
            setCar(res.data.User.carte)
            // console.log( " Admin => ", res.data.User.isAdmin);
            //   console.log('this',res.data.User.isAdmin);
            // if(res.data.user.isAdmin == true){
              
            //      setWelcome(true)
            //  }
            
             if(typeof res.data === "object"){
                return setTest(false)
             }
             
        } catch (err) {
           
            console.log(err);
        }
    }
  
    function check() {
        if(test) {
            nav('/login')
        }
        else{
            alert('Your Ready Conncted')
        }
    }
    // let colorLocal = window.localStorage.getItem('back')
    const [add,setAdd] = useState(true)
   const [nameEnter,setNameEnter] = useState("")
   const [email,setEmail] = useState("")
   const [password,setPassword] = useState("")

    const [logoEnter,setLogoEnter] = useState("")
    const [logoCom,setLogoCom] = useState("")

      async  function valide() {
        if(name == "" || logoEnter == "" || email=="" || name=="" ) return
        let data = new FormData()
        data.append("name",nameEnter)
        data.append('Email',email)
        data.append('password',password)
        data.append('nameStore',name)
        data.append('logo',logoEnter)
         for (let i = 0; i < cats.length; i++) {
          data.append('cat[]',cats[i])
        }

        try {
            const res = await axios.post('http://localhost:5600/api/AddNewStore',data)
            console.log(res);
         window.localStorage.setItem('token',res.data.token)
         document.querySelector('body').classList.remove('P')
         setAdd(true)
         window.location.reload()
        } catch (err) {
           console.log(err);
        }
        //  window.localStorage.setItem("Name",name)
        //  window.localStorage.setItem("Logo",logoCom)

       
     
        

    }

    
    const imageOnChange = (e) => {
      setLogoEnter(e.target.files[0])
        const reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        reader.onload = (ev) => {
            return setLogoCom(ev.target.result);
        };
    };

     let che = async () => {
       const res = await axios.get('http://localhost:5600/api/findStore')
       console.log(res);
       if( !res.data ) {
          document.querySelector('body').classList.add('P')
          setAdd(res.data)
       }
       
    }
    useEffect(()=>{
      che()
    },[])
    function AddToCats() {
      setCats([...cats ,oneCat ])
      setOneCat('')
    }
    console.log('Hey Hey Hey => ',cats);


    function deletCat(index) {
       cats.splice(index,1)
       setRelode(p=>!p)
    }

    useEffect(()=>{
       getNoti()
    },[ colorContext.not ])



    async function getNoti() {
      if(!window.localStorage.getItem('token')){return}
       try {
          const res = await axios.post('http://localhost:5600/api/getNoti', {
            token:window.localStorage.getItem('token')
          })
          console.log('YA',res.data);

          // 100
          let y = res.data.Noti.filter((e)=>{
             return e.type == 100
          })
          if(y.length > 0) {
            console.log('YYYYYYY', y);
            setNoti100(y)}


          // 1
         let ya = res.data.Noti.filter((e)=>{
             return e.type == 1
          })
          if(ya.length > 0) {
            console.log('YYYYYYYAAAAAA', ya);
            setNoti1(ya)}


       } catch (err) {
         console.log(err);
       }
    }



     
         let AllZ =  Array.isArray(car) && car.length > 0 && car.map((e,i)=>{
                             return  <Carte key={i} Titel={e.Titel} Image={e.image} Price={e.price} qu={parseInt(e.qu)} idP={e.idPro} relode={setRelode} ind={i} ct={car} />
        })



     console.log('GGGGGGH+>' , colorContext.carte);


    let backColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back
    let boxColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Box
    let fontColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Font
    return(
         <div>
             <header   style={{background:window.localStorage.getItem('Box')?window.localStorage.getItem('Box'):Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Box}}>
                 {loga && <div className="logout">You are Disconnect</div>}
                 {welcome && <div className="logout">Welcome Admin To Your Store</div>}

                  {!add && 
               <div className="white">

                  <div className="div">
                     <label >Enter Email :  </label>
                     <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} />
                  </div>

                  <div className="div">
                     <label >Enter Password :  </label>
                     <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                  </div>

                  <div className="div">
                     <label >Enter Your Name Store :  </label>
                     <input type="text" value={name} onChange={(e)=> setNameEnter(e.target.value)} />
                  </div>
                  <div className="div">
                     <label >Enter Your Logo </label>
                     <input type="file"  name="logo" onChange={imageOnChange} />
                  </div>

                   <div className="div">
                     <label >Enter Your Cat </label>
                     <div>
                         <div style={{display:'flex',gap:'6px'}}>
                            <input type="text" value={oneCat} style={{width:'80%'}} onChange={(e)=>setOneCat(e.target.value)} name="cat"  />
                            <button onClick={AddToCats}  style={{alignSelf:'center',marginTop:'5px'}}><FontAwesomeIcon icon={faCirclePlus} /> </button>
                         </div>

                      <div style={{marginTop:'10px',display:'flex',gap:'5px'}} >
                            {cats.map((e,i)=>{
                             return <div key={i} className="BoxCat" >
                                    <div>{e}</div> 
                                    <div ><FontAwesomeIcon icon={faCircleXmark} onClick={()=>deletCat(i)} /></div>
                                </div>
                         })}
                         </div>
                        


                     </div>
                  </div>
                  

                   {logoCom.length >0 && <img src={logoCom} style={{width:'50Px',height:'50px',borderRadius:'50%'}}/>}
                   <div style={{display:'flex',justifyContent:'center'}}>
                       <button onClick={valide} className="ValideStore">Valide</button>
                   </div>
               </div>
            }

                  <div style={{display:'flex', gap:'15px',width:'30%',padding:'5px'}}>
                    {console.log(logo)}
                     <div> <img src={logo} alt="Wait...." style={{width:'35px',height:'35px',borderRadius:'50%'}}/></div>
                     <div style={{alignSelf:'center',color:"rgb(220, 219, 219)"}}><h3>{name}</h3></div>
                  
                  </div>

                  <div style={{width:'70%' , display:'flex',justifyContent:'end',gap:'35px',alignItems:'center',marginRight:'40px'}}>
                    <Link to={'/'}> <FontAwesomeIcon icon={faHouse}  className="IconNavBar"  style={{color:'white'}}  /></Link>
                     {user.isAdmin  && <Link to={`/stock`}><FontAwesomeIcon className="IconNavBar" icon={faBox} /></Link>}
                     {!user.isAdmin && validationUser && 
                      <div style={{position:'relative'}}>
                         {fromAdmin.length   > 0 && <div className="reda"></div>}
                         {/* {noti1.length   > 0 && <div className="reda"></div>} */}
                        <Link to={'/MyCom'}><FontAwesomeIcon className="IconNavBar" icon={faFileInvoiceDollar} /></Link>
                      </div>
                     }
                     {user.isAdmin ?<Link to={'/setting'}> <FontAwesomeIcon  icon={faGears} className="IconNavBar"  style={{color:'white'}}  /></Link>:'' }
                     {/* <div onClick={check} ><FontAwesomeIcon icon={faUser}  className="IconNavBar"/></div> */}
                      {user.isAdmin ? <div style={{position:'relative'}}>
                        {notiComend.length > 0  &&  <div className="reda"></div>}
                        {noti100.length > 0  &&  <div className="reda"></div>}
                         <Link to={'/comAdmin'}><FontAwesomeIcon  className="IconNavBar" icon={faCommentDollar} /></Link>
                      </div>: validationUser && <Link to={'/fav'} ><FontAwesomeIcon icon={faHeart} className="IconNavBar" /></Link>}
                      {user.isAdmin ?"" :<div><FontAwesomeIcon icon={faCartPlus} className="IconNavBar" onClick={()=> {
                        // setToggelCarte(p=>!p)
                        colorContext.setTog(p=>!p)
                      }} /></div> }
                     {!test ? <div onClick={logout}><FontAwesomeIcon icon={faPowerOff} className="IconNavBar" /></div>:    <div onClick={check} ><FontAwesomeIcon icon={faUser}  className="IconNavBar"/></div>}
                    
                  </div>

                  {colorContext.tog && <div className="ToggelCarte" style={{background:'white'}}>

                      
                  {AllZ}
                      
                      {
                          Array.isArray(colorContext.carte) && colorContext.carte.length > 0 ?
                           <div style={{display:'flex',gap:'20px',marginTop:'20px'}}>
                             <div className="Totel" style={{background:backColor,color:fontColor}}>
                                <div><p style={{paddingTop:'5px'}} >Totel : {colorContext.totel}$</p></div>
                             </div> 

                
                                <Link to={`sendOder`} onClick={()=>colorContext.setInSend(false)} style={{alignSelf:'center' ,width:'60%', background:backColor,color:fontColor,padding:'10px',borderRadius:'10px',marginTop:'10px',cursor:'pointer'}}>
                                  <p> <FontAwesomeIcon icon={faFileInvoiceDollar} size="xl" color={fontColor} style={{marginRight:'10px'}} />send the order <FontAwesomeIcon icon={faArrowRight} beatFade  /></p>
                                </Link>
                           

                           </div>
                          :
                          <div className="Totel" style={{background:backColor,color:fontColor}}>Nothing</div>
                      }
                      

                    </div>}


             </header>
         </div>
    )
}
