
import './App.css'
import {Welcome, Services, Navbar, Loader, Footer, Transactions} from './components'

function App() {
  

  return (
    <>
    <div className="min-h-screen bg-black text-white">
      <div className="gradient-bg-welcome">
        <Navbar/>
        <Welcome/>
      </div>
      <Services/>
      <Transactions/>
      <Footer/>
    </div>
    </>
        
    
  )
}

export default App
