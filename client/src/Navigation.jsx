import React, {useState} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import GoogleLogin from './GoogleLogin.jsx';
import GoogleLogout from './GoogleLogout.jsx';

const Navigation = ({ userImage, isLoggedIn, checkLogin }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar expand="md">
      <NavbarBrand href="/">Game Tracker</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/">Search</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/library">Library</NavLink>
          </NavItem>
        { isLoggedIn
          ? <GoogleLogout userImage={userImage} checkLogin={checkLogin} />
          : <GoogleLogin checkLogin={checkLogin} />}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default Navigation;