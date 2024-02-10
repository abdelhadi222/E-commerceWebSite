import { useContext, useEffect, useState } from "react";
import NavBar from "../../Compente/NavBar/NavBar";
import { Color } from "../../context/Color";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell , faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import "../ComAdmin/ComAdmin.css"
export default function ComAdmin() {
    let colorContext = useContext(Color)

     let [allSend,setAllSend] = useState([])
     let [allNoSend,setAllNoSend] = useState([])
     let [userSend,setUserSend] = useState([])
     let [userNoSend,setUserNoSend] = useState([])
     let [rt,setRt] = useState([])
     let [userRt,setUserRt] = useState(false)
     let [relode,setRelode] = useState(false)
     let [notiComend,setNotiComend] = useState([])
     let [noti100,setNoti100] = useState([])
     let [noti1,setNoti1] = useState([])
     let [allnoti,setAllNoti] = useState([])
     let [showallnoti,setShowAllNoti] = useState(false)


     useEffect(()=>{

    if(colorContext.socket == null || colorContext.socket.length < 1 ) return 
    
       colorContext.socket.on('getNotiComend',(data)=>{
         console.log('Data Sockt From Nav Bar =>=>=>' , data);
         setNotiComend((p)=>[...p,data])
         console.log('data here => ' , data);
         colorContext.setNot(p=>!p)
       })
   },[colorContext.socket])
     

    useEffect(()=>{
       getComAdmin()
       getNoti()
    },[relode , colorContext.not])



      async function getNoti() {
      if(!window.localStorage.getItem('token')){return}
       try {
          const res = await axios.post('http://localhost:5600/api/getNoti', {
            token:window.localStorage.getItem('token')
          })
          console.log('YYYYAAA',res.data.Noti);
          setAllNoti(res.data.Noti)

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
    
   //  if(allnoti.length > 3 || notiComend.length > 3) {
   //    document.querySelector('.ShowNoti').classList.add('Sh')
   //  }

    
    async function getComAdmin() {
        try {
             const res = await axios.get('http://localhost:5600/api/getComAdmin')
             console.log(res);
             setAllSend(res.data.send)
             setAllNoSend(res.data.notSend)
             console.log( ' All Data',res.data);
             setUserNoSend(res.data.ArNotSendUser)
             setUserSend(res.data.SendUser)
             setRt(res.data.rt)
             setUserRt(res.data.rtUser)
             
        } catch (err) {
            console.log(err);
        }
    }

    async function sendCommende(id,idU) {
        console.log( '2222',idU);
        try {
            const res = await axios.post('http://localhost:5600/api/sendCommende',{idCom:id,token:window.localStorage.getItem('token')})
            console.log(res);
            // setRelode(p=>!p)
            Sokett(1,idU)
            colorContext.setNot(p=>!p)
        } catch (err) {
            console.log(err);
        }

        
    }

          function Sokett(type,idU) {
                  colorContext.socket.emit('sendNotiComen',{
                  senderId:colorContext.color[0].idUser,
                  reciverId:idU,
                  type,
              })
      }



     let backColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Back
   let boxColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Box
    let fontColor = window.localStorage.getItem('Body')?window.localStorage.getItem('Body'): Array.isArray(colorContext.color) && colorContext.color.length > 0 && colorContext.color[0].Font
    return(
        <div className="allCom" style={{width:'100%',height:'100%',paddingBottom:'20px',background:backColor,color:fontColor}}>
            <NavBar/>
             <h1 style={{padding:"16px" ,textAlign:'center'}}> Commends </h1>

           <div style={{width:"100%",height:'50Px',marginTop:'20px',display:'flex',justifyContent:'end',padding:"10px" , position:'relative'}} onClick={()=>{
              if(allnoti.length > 0 || notiComend.length  > 0) {
                document.querySelector('.allCom').classList.add('P')
                setShowAllNoti(true)
              }else{
               alert('Notification not Exsit')
              }
           }}>
            { allnoti.length > 0 || notiComend.length > 0 ?  <div className="redaa">{allnoti.length + notiComend.length}</div>:''}
               <div className="Notifcation" style={{background:boxColor,color:fontColor}}> <FontAwesomeIcon icon={faBell} /> Notifcation  </div>
           </div>

           {showallnoti && allnoti.length > 0 &&
                <div className="ShowNoti">
                 <div style={{position:'relative'}}>
                       <div className="Close" style={{background:boxColor,color:fontColor}} onClick={()=>{
                      document.querySelector('.allCom').classList.remove('P')
                      setShowAllNoti(false)
                   }}><FontAwesomeIcon icon={faCircleXmark} style={{marginRight:'5px'}} />Close</div>
                 </div>
                  { 
                           allnoti.map((e,i)=>{
                            return   <div key={i} style={{marginBottom:'20px', color:fontColor,marginTop:i==0 ?'50px':'0'}}>

                               {e.type == 100 && <div className="e" style={{width:'100%',background:boxColor}}>you have New Commnde N° {e.numComAdmin}</div> }
                               {e.type == 10  && <div className="e" style={{width:'100%',background:boxColor}}>User delet Comend Commnde N° {e.numComAdmin}</div> }
                               {e.type == 20  && <div className="e" style={{width:'100%',background:boxColor}}> Commnde N° {e.numComAdmin} is Router  </div> }
                               {e.type == 30  && <div className="e" style={{width:'100%',background:boxColor}}>user resive his commnde  N° {e.numComAdmin} </div> }
      
                            </div>
                       })
                  }
                </div>
                
           }



               {showallnoti && notiComend.length > 0 &&
                <div className="ShowNoti">
                  <div className="Close"><FontAwesomeIcon icon={faCircleXmark} /></div>
                  { 
                           notiComend.map((e,i)=>{
                            return   <div key={i} style={{marginBottom:'20px', color:fontColor}}>

                               {e.type == 1 && <div className="e" style={{width:'100%',background:boxColor}}>you have New Commnde N°° {e.idComAdmin}</div> }
                               {e.type == 10  && <div className="e" style={{width:'100%',background:boxColor}}>User delet Comend Commnde N°° {e.idComAdmin}</div> }
                               {e.type == 20  && <div className="e" style={{width:'100%',background:boxColor}}> Commnde N°° {e.idComAdmin} is Router</div> }
                               {e.type == 30  && <div className="e" style={{width:'100%',background:boxColor}}>user resive his commnde N°° {e.idComAdmin}</div> }
      
                            </div>
                       })
                  }
                </div>
                
           }

             <div style={{padding:'20px'}}>
                <h3 style={{marginLeft:'30px',marginTop:'20px',padding:"10px"}}> - Commend Not Send </h3>
               <div style={{display:'flex',gap:'20px',flexWrap:'wrap'}}>
                   {Array.isArray(allNoSend) && allNoSend.length > 0 ?allNoSend.map((e,ind)=>{
                     return <div key={ind} className="BoxOfOneComend thiss" style={{background:boxColor,color:fontColor,height:'fit-content'}}>
                        <p className="New">New</p>
                        <h5 style={{textAlign:'center',marginBottom:'20px'}}>N ° commend {e.numAdmin}</h5>

                        <div style={{marginBottom:'10px',marginTop:'15px'}}>
                          <p style={{marginBottom:'10px'}}>User : {userNoSend[ind].First} {userNoSend[ind].Laste}</p>
                          <p style={{marginBottom:'10px'}}>Phone : {userNoSend[ind].phone} </p>
                          <p style={{marginBottom:'10px'}}>Email: {userNoSend[ind].Email} </p>
                        </div>

                        <div>
                            <h3 style={{margin:'30px 20px',textAlign:'center'}}>Product</h3>

                          <div className="df" style={{display:'flex',justifyContent:'space-between', width:'100%',marginBottom:'20px',marginTop:'20px'}}>
                             <div >Image</div>
                             <div>Titel</div>
                             <div>Qu</div>
                             <div>Price unit</div>
                             <div>price </div>
                          </div>
                        </div>
                        {e.Pro.length> 0 && e.Pro.map((el,i)=>{
                             return <div key={i}>
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
                        })
                        }
                        <div className="To" style={{background:backColor}}>totel : {e.Totel}  $ </div>
                        <button onClick={()=>sendCommende(e._id,e.IdUser)}>Send To Client </button>
                         
                     </div>
                }):<div className="NotCom" style={{background:boxColor,color:fontColor}}> You have not Commend  </div>}
               </div>


             </div>






              <div style={{padding:'20px'}}>
                <h3 style={{marginLeft:'30px',marginTop:'20px',padding:"10px"}}> - Commend  Send </h3>
                  <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                   {Array.isArray(allSend) && allSend.length > 0 ? allSend.map((e,ind)=>{
                     return <div key={ind} className="BoxOfOneComend " style={{background:boxColor,color:fontColor,height:'fit-content'}}>
                          { e.isDoneFromAdmin &&  !e.isDoneFromClient && <p className="AttDeConfirmComend">en attend to User</p>}
                          { e.isDoneFromAdmin && e.isDoneFromClient && <p className="TrueFromAdmin">Commedn Done ! </p>}
                        <h5 style={{textAlign:'center',marginBottom:'20px',marginTop:'10px'}}>N ° commend {e.numAdmin}</h5>

                        <div style={{marginBottom:'10px',marginTop:'15px'}}>
                          <p style={{marginBottom:'10px'}}>User : {userSend[ind].First} {userSend[ind].Laste}</p>
                          <p style={{marginBottom:'10px'}}>Phone : {userSend[ind].phone} </p>
                          <p style={{marginBottom:'10px'}}>Email: {userSend[ind].Email} </p>
                        </div>

                        <div>
                            <h3 style={{margin:'30px 20px',textAlign:'center'}}>Product</h3>

                          <div className="df" style={{display:'flex',justifyContent:'space-between', width:'100%',marginBottom:'20px',marginTop:'20px'}}>
                             <div >Image</div>
                             <div>Titel</div>
                             <div>Qu</div>
                             <div>Price unit</div>
                             <div>price </div>
                          </div>
                        </div>
                        {e.Pro.length> 0 && e.Pro.map((el,i)=>{
                             return <div key={i}>
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
                              
                             
                        })
                        }
                        
                          <div className="To " style={{background:backColor}}>totel : {e.Totel} $ </div>
                     </div>
                }):<div className="NotCom" style={{background:boxColor,color:fontColor}}> You have not Commend  </div>}
               </div>

             </div>




             <div style={{padding:'20px'}}>
                <h3 style={{marginLeft:'30px',marginTop:'20px',padding:"10px"}}> - Commend router</h3>
                  {rt.length > 0 ?
                  rt.map((e,ind)=>{
                     return   <div key={ind} className="BoxOfOneComend " style={{background:boxColor,color:fontColor,height:'fit-content'}}>
                          {e.rt  && <div className="red">Retour from {userRt[ind].First} {userRt[ind].Laste}</div>  }
                        <h5 style={{textAlign:'center',marginBottom:'20px',marginTop:'10px'}}>N ° commend {e.numAdmin}</h5>

                        <div style={{marginBottom:'10px',marginTop:'15px'}}>
                          <p style={{marginBottom:'10px'}}>User : {userRt[ind].First} {userRt[ind].Laste}</p>
                          <p style={{marginBottom:'10px'}}>Phone : {userRt[ind].phone} </p>
                          <p style={{marginBottom:'10px'}}>Email: {userRt[ind].Email} </p>
                        </div>

                        <div>
                            <h3 style={{margin:'30px 20px',textAlign:'center'}}>Product</h3>

                          <div className="df" style={{display:'flex',justifyContent:'space-between', width:'100%',marginBottom:'20px',marginTop:'20px'}}>
                             <div >Image</div>
                             <div>Titel</div>
                             <div>Qu</div>
                             <div>Price unit</div>
                             <div>price </div>
                          </div>
                        </div>
                        {e.Pro.length> 0 && e.Pro.map((el,i)=>{
                             return <div key={i}>
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
                             
                        })
                        }
                         <div className="To " style={{background:backColor}}>totel : {e.Totel} $</div>
                        
                         
                     </div>
                  })
                  :<div className="NotCom" style={{background:boxColor,color:fontColor}}> You have not Commend  </div>}
             </div>

        </div>
    )
}