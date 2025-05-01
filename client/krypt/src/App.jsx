
import './App.css'
import {Welcome, Services, Navbar, Transctions} from './components'

function App() {
  

  return (
    <>
    <div className="h-screen">
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
