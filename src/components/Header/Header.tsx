import Logo from "images/Logo.svg"
import { NavLink } from "react-router-dom"
const Header:React.FC = () => {
  return (
    <header className="header">
        <nav className="container header__nav">
            <NavLink to="/"><img src={Logo} alt="" /></NavLink>
            <ul className="header__nav-list">
                <li><NavLink to="/">Главная</NavLink></li>
                <li><NavLink to="/movies">Фильмы</NavLink></li>
              <li><NavLink to="/tvs">Сериалы</NavLink></li>
                <li><NavLink to="/search"><i className="fa-solid fa-magnifying-glass"></i></NavLink></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header