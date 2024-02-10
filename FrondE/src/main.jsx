
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Color from "./context/Color.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Color>
      <App />
    </Color> 
  </BrowserRouter>
)
