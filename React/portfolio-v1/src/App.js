import Navbar from "./Navbar"
import Home from "./Home"
import NotFound from "./NotFound"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
