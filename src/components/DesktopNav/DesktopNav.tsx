import './DesktopNav.css'
import { Link } from "react-router-dom";

const DesktopNav = () => {
  return (
    <nav className='desktopNav'>
        <Link className='navLink' to='/'>Home</Link>
        <Link className='navLink' to='/topics/allTopics' >Topics</Link>
        <Link className='navLink' to='/aboutus'>About Us</Link>
    </nav>
  )
}

export default DesktopNav