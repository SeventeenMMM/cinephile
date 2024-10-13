import Header from "./components/Header/Header"
import Home from "./pages/Home"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Movies from "./pages/Movies"
import Tvs from "./pages/Tvs"
import Search from "./pages/Search"
import Current from "./components/Current/Current"


const App:React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={ <Home />}/>
          <Route path="/movies" element={ <Movies />}/>
          <Route path="/tvs" element={ <Tvs />}/>
          <Route path="/search" element={ <Search />}/>
          <Route path="/:type/:id" element={ <Current />}/>
        </Routes>
      </main>
    </Router>
  )
}

export default App