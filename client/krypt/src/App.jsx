
import './App.css'
import {Welcome, Services, Navbar, Loader, Transctions} from './components'

function App() {
  

  return (
    <>
    <div className="min-h-screen bg-black text-white">
      <div className="gradient-bg-welcome">
        <Navbar/>
        <Welcome/>
      </div>
      <Services/>
      <Transctions/>
      
      
    </div>
    </>
        
    
  )
}

export default App
