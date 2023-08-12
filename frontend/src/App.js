import React , {useRef} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './retro_logo.png';



import Login from './login';
import SignUp from './signup';
import Home from './Home';

{/* get rid of the navbar in the login and signup page */}
{/* make a password requirement list for the signup page */}
{/* at least 1 digit, at least one character ,at least one capital character and minimum 8 chars*/}

function App() {
  const homeRef = useRef(null);
  return (
    
    <Router>
     
      <div className="App">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            {/* Logo (linked to the Sign-in page) */}
            <Link className="navbar-brand" to={'/home'} onClick={() => {
  // If the Home component is mounted, call the resetToDepartments method
  if (homeRef.current) {
    homeRef.current.resetToDepartments();
  }
}}>
  <img src={logo} alt="" class="logo-img"/>
</Link>

          </div>
        </nav>

        {/* Main content */}
        <div className="auth-wrapper">
          <div className="auth-inner">
            {/* Routes configuration */}
            <Routes>
           
              {/* Route for the default page (Login) */}
              <Route exact path="/" element={<Login />} />
              {/* Route for the Sign-in page */}
              
              <Route path="/sign-in" element={<Login />} />
              {/* Route for the Sign-up page */}
              <Route path="/sign-up" element={<SignUp />} /> 
              
       
              <Route path="/home" element={<Home ref={homeRef} />} /> 

            
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;