import NavBar from "../../Compente/NavBar/NavBar";
import  "../../page/Settinges/Settinges.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears , faPen  , faCircleCheck , faCircleXmark , faCirclePlus , faUpload,faSquareMinus ,faShop,faArrowAltCircleLeft , faArrowAltCircleDown, faPlus, faMinus , faCloudArrowUp} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import {Color}  from "../../context/Color.jsx"



export default function Setting() {
    let colorContext = useContext(Color)
    console.log('ff ' , colorContext);
      let [showMeunPro,setShowMeunPro] = useState(false)
    let [logo,setLogo] = useState('')
    let [newlogo,setNewLogo] = useState('')
    let [logoCompi,setLogoCompi] = useState('')
    let [name,setName] = useState('')
    let [color,setColor] = useState('')
    let [email,setEmail] = useState('')
    let [showAddPro,setShowAddPro] = useState(false)
    let [boxOfChangePassword,setBoxOfChangePassword] = useState(false)
    let [addCat,setAddCat] = useState(false)

    let[oneCat,setOneCat] = useState('')
    let [cats,setCats] = useState([])
  
  // password  => 
    let [oldPassword,setOldPassword] = useState('')
    let [newPassword,setNewPassword] = useState('')
    let [confirmationPassword,setConfirmationPassword] = useState('')
    // button Valide De Color => 
     let [colorBack,setColorBack] = useState('')
     let [colorFont,setColorFont] = useState('')
     let [colorBox,setColorBox] = useState('')

    // valide Button Color 
    const [showValideBox,setShowValideBox] = useState('')
    const [showValideBack,setShowValideBack] = useState('')
    const [showValideFont,setShowValideFont] = useState('')

    const [newName,setNewName] = useState('')
    const [newEmail,setNewEmail] = useState('')
        const [relode,setRelode] = useState(false)
       
   const [store,setStore] = useState([])

   let [showRemoveCat,setShowRemoveCat] = useState(false)

   // add Pro => 
   const [titel,setTitel] = useState('')
   const [des,setDes] = useState('')
   const [price,setPrice] = useState('')
   const [qu,setQu] = useState('')
   const [cat,setCat] = useState('Select Catrecory')
   const [images,setImages] = useState([])
   const [imagesCompi,setImagesCompi] = useState([])
   const [showImages,setShowImages] = useState(false)

    useEffect(()=>{
      getStore()
      getUser()
    },[relode])

       async function getStore() {   
        
         try {
            const res = await axios.get('http://localhost:5600/api/getStore')
            console.log('Store from top => ',res);
            console.log('IS',res.data.store.cat);
            setStore(res.data.store.cat)
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
            setEmail(res.data.User.Email)
            
         
        } catch (err) {
           
            console.log(err);
        }
    }

    //  useEffect(()=>{
    //       Body() 
    //  },[])
    // function Body() {
    //      document.querySelector('body').style = `background-color: ${window.localStorage.getItem('Body')?window.localStorage.getItem('Body'):colorContext.color.length > 0 && colorContext.color[0].Back}`
    //     //   document.querySelector('main').style = `background-color: ${window.localStorage.getItem('Body')?window.localStorage.getItem('Body'):colorContext.color.length > 0 && colorContext.color[0].Back}`
    // }

    async function changeColor(color,ty) {
      console.log('red red ',color);
          console.log('red red ',ty);
        try {
            let res = await  axios.post('http://localhost:5600/api/StockColor',
            {color,type:ty,token:window.localStorage.getItem('token')})
            console.log('res > ' ,  res);
           
        } catch (err) {
            console.log(err);
            
        }
    }

    function ff(mov) {
        document.querySelector(`.${mov}`).removeAttribute('disabled')
    }
    // let colorLocal = window.localStorage.getItem('back')
    // let colorLocalFont = window.localStorage.getItem('Font')
    let BoxBox =   Array.isArray(colorContext.color) && colorContext.color.length > 0  && colorContext.color[0].Box
    function chPas() {
        document.querySelector('.MAinOfSettengs').classList.add('P')
        setBoxOfChangePassword(true)
    }
    function closeChPas() {
         setBoxOfChangePassword(false)
          document.querySelector('.MAinOfSettengs').classList.remove('P')
    }

    async function UpdatePassword() {
      console.log(oldPassword);
         try { 
             const res = await axios.post('http://localhost:5600/api/UpdatePassword',{
                oldPassword:oldPassword,
                NewPassword:newPassword,
                consfirmationPassword :confirmationPassword,
                token:window.localStorage.getItem('token')

             })
             console.log(res);
             if(res.data == "Is Update Password is Done") {
               setBoxOfChangePassword(false)
                document.querySelector('.MAinOfSettengs').classList.remove('P')
             }
         } catch (err) {
            console.log(err);
         }
    }

   async function updateNameOrEmail(type) {
    console.log(name);
         try {
            const res = await axios.post('http://localhost:5600/api/UpdateNameStore',{
              type:type,
              NewEmail:email,
              newName:name,
              token:window.localStorage.getItem('token')
            })
            console.log(res);
            if(res.data == 'Is DOne Update Name Store ') {
              colorContext.setRelode(p=>!p)
            }
         } catch (err) {
            console.log(err);
         } 
    }


     const imageOnChangeLogo = (e) => {
      setNewLogo(e.target.files[0])
        const reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        reader.onload = (ev) => {
            return setLogoCompi(ev.target.result);
        };
    };


 async function ValideLogo() {
  let data = new FormData()
  data.append('update',newlogo)
     try {
        const res = await axios.post('http://localhost:5600/api/UpdateImageStore',data)
        console.log( "Upde ",res);
        if(res.data == 'Is DOne Update Image Store'){
            setRelode(p=>!p)
           setNewLogo('')
           colorContext.setRelode(p=>!p)
           setLogoCompi('')
           document.querySelector('.MAinOfSettengs').classList.remove('P')
        }

     } catch (err) {
       console.log(err);
     }
  }

  function inValideLogo() {
    setNewLogo('')
    setLogoCompi('')
    document.querySelector('.MAinOfSettengs').classList.remove('P')
  }


  function AddCat() {
      document.querySelector('.MAinOfSettengs').classList.add('P')
      setAddCat(true)
  }

  console.log('Cats FromS Settings  => ',cats);

  function deletCat(index) {
   cats.splice(index,1)
   setRelode(p=>!p)
  }

  function ADDCAT() {
   if(oneCat == "") return
    setOneCat('')
    setCats([...cats,oneCat])
  }


 async function ValideCat() {

for (let i = 0; i < cats.length; i++) {
   for (let j = i+1; j < cats.length; j++) {
     if(cats[i].toLowerCase() == cats[j].toLowerCase()) {
       cats.splice(j,1)
     }
   }
}
console.log('Naw Cats =>' ,cats);

    try {
       const res = await axios.post('http://localhost:5600/api/AddCat',{cats:cats})
       console.log(res);
       setOneCat('')
       setCats([])
       setAddCat(false)
       setRelode(p=>!p)
       colorContext.setRelode(p=>!p)
          document.querySelector('.MAinOfSettengs').classList.remove('P')
    } catch (err) {
       console.log(err);
    }
  }


  function removeCat() {
      document.querySelector('.MAinOfSettengs').classList.add('P')
      setShowRemoveCat(true)
  }


async function deletONeCat(text) {
    try {
       const res = await axios.post('http://localhost:5600/api/deletCat',{Onecat:text})
       console.log(res);
       setRelode(p=>!p)
       colorContext.setRelode(p=>!p)
    } catch (err) {
       console.log(err);
    }
  }

  console.log('Cat => ',cat);


    const imageOnChangeAddPro = (e) => {
      setImages(e.target.files[0])
        const reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        reader.onload = (ev) => {
            return setImagesCompi(ev.target.result);
        };
    };


    console.log('Images Compi => ',imagesCompi);

   async function AddProFun() {
      if(titel =="" || des =='' || price =="" || cat=='' || cat=='Select Catrecory' || imagesCompi.length == 0) {
          alert('Svp Remli tous les Chaine')
          return
      }
      if(imagesCompi.length > 6) {
          alert('Pls the Taille OF Images Is six')
          return
      }
      let data = new FormData()
      data.append('Titel',titel)
      data.append('des',des)
      data.append('Price',price)
      data.append('cat',cat)
      data.append('qu',qu)
      for (let i = 0; i < imagesCompi.length; i++) {
        data.append('images[]',imagesCompi[i])
      }
      try {
           const res = await axios.post('http://localhost:5600/api/AddPro',data)
           console.log(res);
           window.location.pathname = '/'
      } catch (err) {
         console.log(err);
      }
    }

    function Check() {
      document.querySelector('.MAinOfSettengs').classList.add('P')
      // setShowImages(true)
    }

    function up() {
       document.querySelector('.MAinOfSettengs').classList.remove('P')
       setShowImages(true)
    }

   //  function don() {
   //    document.querySelector('.MAinOfSettengs').classList.remove('P')
   //     setShowImages(true)
      
   //  }


   function deletIma(index) {
      
       imagesCompi.splice(index,1)
       setRelode(p=>!p)
       if(imagesCompi.length == 0) {
          setShowImages(false)
          document.querySelector('.MAinOfSettengs').classList.remove('P')
       }
   }

   let backColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back
   let boxColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Box





    return(
        <div  className="MAinOfSettengs" style={{width:'100%',height:'100%',color:window.localStorage.getItem('Font')?window.localStorage.getItem('Font'):Array.isArray(colorContext.color) && colorContext.color.length> 0 && colorContext.color[0].Font,backgroundColor: window.localStorage.getItem('Body')?window.localStorage.getItem('Body'):Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back}}>
            <NavBar/>
             <div className="TitelSettings">
                <h3> <FontAwesomeIcon  icon={faGears} size="30px" style={{color:window.localStorage.getItem('Font')?window.localStorage.getItem('Font'):Array.isArray(colorContext.color) && colorContext.color.length> 0 && colorContext.color[0].Font}}  /> Settings </h3>
             </div>

             {boxOfChangePassword && 
               <div className="BoxWhite ">
                  <div style={{display:'flex',justifyContent:'end'}} onClick={closeChPas}>
                     <div style={{position:'relative',width:'30px',height:'30px',background:colorContext.color[0].Box,display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <FontAwesomeIcon icon={faCircleXmark}  style={{color:'white',cursor:"pointer"}} />
                     </div>
                     
                  </div>

                  <div className="BoxDkhlePaswordChange">
                      <h3>Change  Password</h3>

                      <div style={{margin:'10px 0'}}>
                          <input  type="password" placeholder="Old Password" value={oldPassword}  onChange={(e)=>setOldPassword(e.target.value)} style={{background:colorContext.color[0].Back,color:colorContext.color[0].Font}} />
                      </div>

                       <div style={{margin:'10px 0'}}>
                          <input type="password" placeholder="New Password " value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}  style={{background:colorContext.color[0].Back}}/>
                      </div>

                       <div style={{margin:'10px 0'}}>
                         <input type="password" placeholder="Confirmation New Password"  value={confirmationPassword} onChange={(e)=>setConfirmationPassword(e.target.value)} style={{background:colorContext.color[0].Back}} />
                      </div>

                      <div style={{margin:'10px 0'}} onClick={UpdatePassword} >
                        <button className="ButtonChangePassword" style={{background:colorContext.color[0].Box,color:colorContext.color[0].Font}}>Update Password </button>
                      </div>

                  </div>

               </div>
             }

             <main style={{marginTop:'-6px',backgroundColor: window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back}}>
                 <div className="ddiv" style={{background:window.localStorage.getItem('Box')?window.localStorage.getItem('Box'):Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Box}}>

                    <div style={{display:'flex'}}>

                         <div style={{margin:'20px'}}>
                           <img src={logo} alt=""  style={{width:'100px',height:"100px", borderRadius:'50%'}}/>
                         </div>

                          <div style={{alignSelf:'center'}}>
                              <button style={{position:'relative',width:'100px',height:'20px',background:window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back,color:window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Font}} className="UplodImag">
                                   <p style={{zIndex:'30',position:'absolute',left:'0',top:'0',display:'contents'}}><FontAwesomeIcon icon={faUpload} style={{marginRight:'10px'}} />Uplode</p>
                                  <input type="file" value={""} onChange={imageOnChangeLogo} style={{background:'red',zIndex:'50',position:'absolute',left:'0',top:'0',width:'100%',opacity:'0',height:'30px'}} />
                              </button>
                            
                             
                             {logoCompi != '' &&  document.querySelector('.MAinOfSettengs').classList.add('P')}
                             {newlogo && <div style={{position:'absolute',zIndex:"2000",width:'30%',height:'280px',background:'white',borderRadius:'10px',left:'40%',top:'15%'}}>
                                <div style={{textAlign:'center'}}>
                                   <img src={logoCompi} style={{width:"200px",height:'200px',borderRadius:'50%',margin:"10px auto",}} alt="" />
                                </div>

                                <div style={{display:"flex",justifyContent:'center',alignItems:'center',gap:'20px'}}>
                                  <button className="VlideImage1" onClick={ValideLogo}>Valide</button>
                                  <button className="VlideImage2" onClick={inValideLogo}>Canel</button>
                                </div>

                              </div>}

                         </div>

                    </div>

                     <div style={{margin:'15px',display:"flex"}}>
                           <input type="text" value={name} disabled  className="inpu" onChange={(e)=>setName(e.target.value)}/>
                          <div className="BB" onClick={()=>updateNameOrEmail('Name')}> <FontAwesomeIcon icon={faPen} beatFade style={{color: "#444650",}} onClick={()=>ff('inpu')} /></div>
                     </div>

                     <div style={{margin:'15px',display:"flex"}}>
                           <input type="text" value={email} disabled className="inpuEmail" onChange={(e)=>setEmail(e.target.value)}/>
                          <div className="BB" onClick={()=>updateNameOrEmail('Email')}> <FontAwesomeIcon icon={faPen} beatFade style={{color: "#444650",}} onClick={()=>ff('inpuEmail')} /></div>
                     </div>

                     {/* <div style={{margin:'25px',display:"flex"}}>
                           <input type="text" value={name} disabled className="inpu" onChange={(e)=>setNewName(e.target.value)}/>
                          <div className="BB"> <FontAwesomeIcon icon={faPen} beatFade style={{color: "#444650",}} onClick={ff} /></div>
                     </div> */}

                     <div style={{display:'flex',gap:'35px'}}>
                        <div className="whitePaSSword" style={{color:'black'}} onClick={chPas}><p>Change Password </p></div>
                        <div className="BB"> <FontAwesomeIcon icon={faPen} beatFade style={{color: "#444650",}} onClick={chPas} /></div>
                     </div>



                      <div className="Ls">
                          <div ><button onClick={AddCat} className="CtBu CtA" style={{background:window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back,color:window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Font}}> <FontAwesomeIcon icon={faPlus}  style={{marginRight:'5px'}} />Add Catecory</button></div>
                          <div ><button onClick={removeCat} className="CtBu  CtR" style={{background:window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back,color:window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Font}}> <FontAwesomeIcon icon={faMinus} style={{marginRight:'5px'}} />Remove Catecory</button></div>
                     </div>

                  

   <div style={{margin:'15px' , display:'flex'}}>



    <div style={{display:'flex',gap:'10px'}}>
        <div className="SettingsColor">
                      <div style={{display:'flex',gap:'40px'}}>
                          <label htmlFor="" style={{alignSelf:'center'}}>For box </label>
                           <input type="color" className="ColorInput1" value={window.localStorage.getItem('Box')?window.localStorage.getItem('Box'):BoxBox} onChange={(e)=>{
                            setColorBox(e.target.value)
                            setShowValideBox(true)
                            window.localStorage.setItem('Box',e.target.value)
                        }} />
                      </div>
                  </div>

                  
                 <div style={{alignSelf:'center'}} >
                                 {showValideBox &&
                           <div style={{display:'flex',gap:'10Px'}}>
                              <p  className="Vlide" onClick={()=>{
                            changeColor({colorBox:colorBox},'Box')
                            setShowValideBox(false)
                             window.localStorage.removeItem('Box')
                             colorContext.setRelode(p=>!p)
                        }}> <FontAwesomeIcon icon={faCircleCheck} /> </p>

                             <p  className="anu" onClick={(()=>{
                                 window.localStorage.removeItem('Box')
                                 setShowValideBox(false)
                             })}>
                               <FontAwesomeIcon icon={faCircleXmark} />
                             </p>

                           </div>
                        }
                         </div>
    </div>
                    

             
                    <div style={{display:'flex',gap:'10px'}}>
                        <div className="SettingsColor">
                           <div style={{display:'flex',gap:'16px'}}>
                              <label htmlFor="" style={{alignSelf:'center'}}>Fonts  Color </label>
                           <input type="color" className="ColorInput" value={window.localStorage.getItem('Font')?window.localStorage.getItem('Font'):Array.isArray(colorContext.color) && colorContext.color.length> 0 && colorContext.color[0].Font} onChange={(e)=>{
                               setColorFont(e.target.value)
                               setShowValideFont(true)
                               window.localStorage.setItem('Font',e.target.value)
                           }}  />
                           </div>
                        </div>   
                            <div style={{alignSelf:'center'}}>{
                            showValideFont && <div style={{display:'flex',gap:"10px"}}>
                                 <p className="Vlide" onClick={()=>{
                                changeColor({colorFont:colorFont},'Font')
                                 setShowValideFont(false)
                                 colorContext.setRelode(p=>!p)
                                 window.localStorage.removeItem('Font')
                            }}>  <FontAwesomeIcon icon={faCircleCheck} /> </p>


                            <p className="anu" onClick={()=>{
                                 setShowValideFont(false)
                                 window.localStorage.removeItem('Font')
                            }}>  <FontAwesomeIcon icon={faCircleXmark} /></p>
                            </div>
                             
                            }</div>
                       </div>





                     <div style={{display:'flex',gap:'10px'}}>
                       <div className="SettingsColor">
                            <label htmlFor=" " style={{alignSelf:'center'}}> Body Color </label>
                           <input type="color" className="ColorInput" value={window.localStorage.getItem('Body')?window.localStorage.getItem('Body'):Array.isArray(colorContext.color)&& colorContext.color.length > 0 && colorContext.color[0].Back}  onChange={(e)=>{
                             setColorBack(e.target.value)
                             setShowValideBack(true)
                             window.localStorage.setItem('Body',e.target.value)
                       
                           }}/>
                         </div>  
                          <div style={{alignSelf:'center'}} >
                             {showValideBack && 
                              <div style={{display:'flex',gap:'10px'}}>
                           <p className="Vlide" onClick={()=>{
                            changeColor({colorBack:colorBack},'Back')
                            setShowValideBack(false)
                            window.localStorage.removeItem('Body')
                            colorContext.setRelode(p=>!p)
                           }}>   <FontAwesomeIcon icon={faCircleCheck} /> </p>

                           <p className="anu" onClick={()=>{
                              window.localStorage.removeItem('Body')
                              setShowValideBack(false)
                           }}><FontAwesomeIcon icon={faCircleXmark} /></p>

                              </div>
                           }
                          </div>
                          
                       </div>


                     </div>


                    

                 </div>

                 

                 <div className="ddivTwo" style={{background:window.localStorage.getItem('Box')?window.localStorage.getItem('Box'):Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Box}}>
                    {!showAddPro && <div className="OneFroSettings">
                        <div className="BoxAddProIcon" onClick={()=>setShowAddPro(true)}><FontAwesomeIcon icon={faCirclePlus} size="2xl" style={{color:window.localStorage.getItem('Box')?window.localStorage.getItem('Box'):Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Box}} /></div>
                    </div> }

                    {showAddPro  &&
                       <div className="BoxAddPro">
                        
                         
                         <div>
                           <h2 style={{margin:'30px  20Px',paddingTop:'20px',textAlign:'center'}}> <FontAwesomeIcon icon={faShop} style={{marginRight:'10px',paddingTop:'50px'}} />Add New Product</h2>


                               
                               <div className="ContiOfSelect" style={{borderRadius:showMeunPro?'10px 10px 0px 0px ':'10px'}}>

                              <div  onClick={()=>setShowMeunPro(p=>!p)} style={{display:'flex',justifyContent:'space-between',alignItems:'center',color:'black',padding:'3px'}}>
                                   <div style={{marginTop:'7px'}}>{cat}</div>
                                   <div  style={{marginTop:'7px'}} >{showMeunPro?<FontAwesomeIcon icon={faArrowAltCircleLeft} /> :<FontAwesomeIcon icon={faArrowAltCircleDown} />}</div>
                              </div>
                         
                              
                                 
                                 {showMeunPro &&
                                   <div className="MeunWhite">
                                      {store.length > 0 && store.map((e,i)=>{
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


                              <div>
                               <input type="text" placeholder="Titel product " value={titel} onChange={(e)=>setTitel(e.target.value)} />
                             </div>

                            <div>
                              <input type="text" placeholder="Des product "  value={des} onChange={(e)=>setDes(e.target.value)}/>
                            </div>


                            <div>
                              <input type="text" placeholder="Price product" value={price} onChange={(e)=>setPrice(e.target.value)} />
                            </div>

                            <div>
                              <input type="number" placeholder="Qu"  value={qu} onChange={(e)=>setQu(e.target.value)} />
                            </div>


                            

                            <div style={{position:'relative',display:'flex',width:'100%',background:'white',height:'40px',borderRadius:'10px'}}>
                              <p style={{position:'absolute',left:'120px',top:'10px',color:'black',height:' 40px',marginTop:'-10px',width:'60%',background:'white',marginLeft:'5Px',alignSelf:'center',display:'flex',justifyContent:'center',alignItems:"center"}} onClick={()=>setShowImages(false)}> Images Taille is {imagesCompi.length}</p>

                             <div style={{position:'relative' , width:'40%'}}>
                                <input type="file" multiple  onClick={()=>setShowImages(false)} onChange={(e)=>setImagesCompi([...imagesCompi,...e.target.files])} style={{width:'100%',alignSelf:'center',zIndex:'3',height:'45px',marginTop:'15px',backgroundColor:"red",position:'absolute',left:'0',top:'-17px',borderRadius:'10px 0px 0px 10px',opacity:'0'}} />
                                <p style={{width:'100%',height:'100%',position:"absolute",left:'0',top:'0',background:backColor,display:'flex',paddingTop:'5px',justifyContent:'center',zIndex:'1'}}><FontAwesomeIcon icon={faCloudArrowUp} size="2xl" /></p>
                             </div>

                            </div>

                            <div style={{display:'flex',justifyContent:'center'}}>
                              <button onClick={AddProFun} className="BUAddPro" style={{background: Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back}}> <FontAwesomeIcon icon={faPlus} />Add Pro</button>
                            </div>

                            {imagesCompi.length > 0 && !showImages && Check() }
                            {/* {imagesCompi.length > 0  && setShowImages(true)} */}
                            {
                              imagesCompi.length > 0  && !showImages &&
                                  <div className="BoxOfImagesAddPro">
                                    <h2 style={{color:'black',textAlign:'center'}}>Images For Product : </h2>
                                     <div style={{width:'100%',margin:'30px auto',display:'flex',gap:'10px',justifyContent:'center',zIndex:'2000',flexWrap:'wrap'}}>
                                    {imagesCompi.length> 0 && 
                          
                                    imagesCompi.map((e,i)=>{
                                      return i == 0 ?
                                      <div className="this" ><p className="pInThis" style={{position:'absolute',left:'10px',top:'0',fontSize:'10px',zIndex:'3000',color:'white'}}>This</p><FontAwesomeIcon icon={faCircleXmark} style={{color:'red',position:"absolute",right:'0',top:'0'}} onClick={()=>deletIma(i)} /><img  key={i} src={URL.createObjectURL(e)} alt="" style={{width:'100px',height:'100px',borderRadius:'10px'}} /></div>
                                      : <div style={{position:'relative'}}><FontAwesomeIcon icon={faCircleXmark} style={{color:'red',position:"absolute",right:'0',top:'0'}} onClick={()=>deletIma(i)} /><img key={i} src={URL.createObjectURL(e)} alt="" style={{width:'100px',height:'100px', borderRadius:'10px'}} /></div>
                                     
                                           })}
                                </div>

                                <div>
                                   <button onClick={up}>Valide</button>
                                </div>
                                
                           </div>

                            }
                           
                    

                         </div>
                       

                       </div>
                    }


                  { addCat && 
                     <div className="AddCat">

                         <div style={{display:'flex',gap:'10px'}}>
                            <input type="text" value={oneCat} onChange={(e)=>setOneCat(e.target.value)} />
                            <button onClick={ADDCAT} className="BuTAddFromSet"  style={{background:window.localStorage.getItem('Box')?window.localStorage.getItem('Box'):Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Box}}><FontAwesomeIcon icon={faCirclePlus} /> </button>
                          
                         </div>

                         <div style={{display:'flex',gap:'5Px'}}>
                            {cats.length> 0 && cats.map((e,i)=>{
                               return <div key={i} className="BoxCat" style={{background:Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back,color:Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Font}}>
                                    <div>{e}</div> 
                                    <div ><FontAwesomeIcon icon={faCircleXmark} onClick={()=>deletCat(i)} /></div>
                               </div>
                            })}
                         </div>

                         <div  style={{width:'100%',display:'flex',justifyContent:'center'}} onClick={ValideCat}>
                           <button className="BuOfAddCatINSettings"  style={{background:window.localStorage.getItem('Box')?window.localStorage.getItem('Box'):Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Box}}>Add Catcro</button>
                         </div>

                          
                     </div>
                  }

                  {showRemoveCat && 
                     
                     <div className="RemoveCat">
                        {store.length >0 && store.map((e,i)=>{
                           return <div key={i} className="BoxOfDeletCat">
                                <div>{e}</div>
                                <div style={{width:'10%',height:"25px",
                                background:'red',padding:'4px',color:'white',display:'flex',justifyContent:'center'
                                ,cursor:'pointer',borderRadius:'10px',alignItems:'center'}} onClick={()=>deletONeCat(e)}><FontAwesomeIcon icon={faSquareMinus} /></div>
                           </div>
                         })}
                     </div>
                    
                  }

                 

                 </div>


             </main>
        </div>
    )
}