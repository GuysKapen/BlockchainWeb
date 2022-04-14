import { useState } from 'react'
import './App.css'
import { Navbar, Welcome } from "./components/index.js";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
    </div>
    {/* <Services /> */}
    {/* <Transactions /> */}
    {/* <Footer /> */}
  </div>
  )
}

export default App
