import axios from "axios";
import {createContext, useEffect, useState } from "react";
 import io from "socket.io-client";

export const Color  = createContext("")
export default function MeunCont({children}) {
    const [color,setColor] =useState([]) 
     const [imgV,setImgV] =useState('') 
      const [user,setUser] =useState('') 
     const [carte,setCaret] =useState('') 
     const [tog,setTog] =useState(false) 
    const [totel,setTotel] =useState(0) 
    let [relode,setRelode] = useState(false)
    let [add,setAdd] = useState(true)
     let [not,setNot] = useState(true)
    let [isSend,setIsSend] = useState(true)
    let [good,setGood] = useState(true)

    let [socket,setSocket] = useState('')

    useEffect(()=>{
        ColorGet()  
    },[relode])


    useEffect(()=>{
      getUser()
    },[add, tog])


     async function getUser() {
        if(!window.localStorage.getItem('token')){
            return
        }
        try {
            const res = await axios.post('http://localhost:5600/api/getUser',{token:window.localStorage.getItem('token')}) 
            setCaret(res.data.User.carte)
            setUser(res.data.User)
            // let t = res.data.User.carte.map((e)=>{
            //      return e.price!=''  && e.price   
            // })
            let f =0
            for (let i = 0; i <  res.data.User.carte.length; i++) {
                f+= parseInt( res.data.User.carte[i].price * res.data.User.carte[i].qu )
                
            }
            console.log('IIIIIII => ',f);
            setTotel(f)
        } catch (err) {
           
            console.log(err);
        }
    }

    console.log( 'Add Co => ',add);

    async function ColorGet() {
        try {
            let res = await axios.get('http://localhost:5600/api/getColor')
            console.log('res Context => Color => ' , res.data.Store);
            setColor(res.data.Store)
            setImgV(res.data.Store.imageCov)
        } catch (err) {
            console.log('Validation err from Contetxt Color ');
        }
    }

    useEffect(()=>{
        if(!user._id) return
         console.log("Before creating new socket");
         const newSocket = io('http://localhost:4900')
         setSocket(newSocket)
         console.log("After =>",newSocket);
      
         return ()=> {
            newSocket.disconnect()
         }

    },[user._id])

   let [onlineUsers,setOnlineUsers] = useState([])

    useEffect(()=>{
        if(socket == null || !user._id  ) return
         socket.emit("addNewUser",user._id)
         socket.on('getOnlineUsers',(res)=>{
            console.log('Res Online Users From  contetx',res);
            setOnlineUsers(res)
         })
         return ()=>{
           socket.off("getOnlineUsers")
         }
     },[socket])




    
    return <Color.Provider value={{ not,setNot , socket , add,setAdd,isSend,setIsSend,good,setGood,tog,setTog,totel,setTotel,carte,setCaret,imgV,color,setColor,relode,setRelode}}>{children}</Color.Provider>
}