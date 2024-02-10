import { Routes,Route } from "react-router-dom"
import Home from "./page/Home"
import Login from "./page/Login/Login"
import Register from "./page/Register/Register"
import Setting from "./page/Settinges/Settinges"
// import { useContext, useEffect } from "react"
// import{Color} from "./context/Color.jsx"
import { createContext } from "react"
import SendOder from "./page/SendOder/SendOder.jsx"
import MyCom from "./page/MyCom/MyCom.jsx"
import Fav from "./page/Fav/Fav.jsx"
import ShowPro from "./page/ShowPro/ShowPro.jsx"
import ComAdmin from "./page/ComAdmin/ComAdmin.jsx"
import Sotck from "./page/Sotck/Sotck.jsx"
import { UpdatePro } from "./page/UpdatePro/UpdatePro.jsx"
function App() {
  //  let clo = useContext(Color)
  //  console.log('APP',clo && clo.color[0].Back);
  //      useEffect(()=>{
  //        document.querySelector("body").style = ` background-color: ${clo.color[0].Back}`
  //      })
  return (
    <div>

        <Routes>
          
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/login"} element={<Login/>}/>
           <Route path={"/register"} element={<Register/>}/>
           <Route path={"/setting"} element={<Setting/>}/>
           <Route path={"/commendForAdmin"} element={<Setting/>}/>
           <Route path={"/commendForUser"} element={<Setting/>}/>
           <Route path={"/sendOder"} element={<SendOder/>}/>
           <Route path={"/MyCom"} element={<MyCom/>}/>
           <Route path={"/fav"} element={<Fav/>}/>
           <Route path={"/comAdmin"} element={<ComAdmin/>}/>
           <Route path={"/shwoP/:id"} element={<ShowPro/>}/>

           <Route path={"/stock"} element={<Sotck/>}/>
           <Route path={"/stock/:id"} element={<UpdatePro/>}/>

    
           

        </Routes>
    </div>
  )
}

export default App
