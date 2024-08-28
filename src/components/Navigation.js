import Navbar from 'react-bootstrap/Navbar';

import logo from '../logo.png';

const Navigation = () => {
  return(
    <Navbar>
    <img 
    alt="logo" 
    src={logo} 
    width="40" 
    height="40"
    clasName="d-inline-block align-top mx-3"
    />
    <Navbar.Brand href="#">Decentratality ICO Crowdsale</Navbar.Brand>
    </Navbar>
    
  )
}

export default Navigation;