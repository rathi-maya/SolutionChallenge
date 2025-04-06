import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from '@mui/material'
import './Navbar.css'

const Navbar = () => {
  const { currentUser, logout } = useAuth()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          VolunteerMatch
        </Link>
        
        <div className="navbar-links">
          <Link to="/opportunities" className="nav-link">Opportunities</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          
          {currentUser ? (
            <>
              <Link 
                to={currentUser.role === 'organization' ? '/organization' : '/volunteer'} 
                className="nav-link"
              >
                Dashboard
              </Link>
              <Button variant="contained" color="error" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="contained" color="primary">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar