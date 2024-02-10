import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [data,setData] = useState([])
  useEffect(()=>{
     getData()
  },[])

  async function getData() {
     try {
         const res =  await axios.get('https://dummyjson.com/products')
         console.log(res.data.products);
         setData(res.data.products)
     } catch (err) {
        console.log('validation err is => ' , err);
     }
  }

  return (
    <div>
        
        <div style={{display:'flex',gap:"15px",width:'100%',flexWrap:'wrap'}}>
          {data.length > 0 && data.map((e,i)=>{
              return <div key={i} style={{width:'25%',height:'300Px',background:'red'}}>
                 <div><img src={e.images[0]} alt="" /></div>
                 <div style={{display:'flex',justifyContent:'space-between'}}>
                   <div>{e.title}</div>
                   <div>{e.category}</div>
                 </div>

                 <div>
                   {e.description}
                 </div>
              </div>
          })}
        </div>
    </div>
  )
}

export default App
