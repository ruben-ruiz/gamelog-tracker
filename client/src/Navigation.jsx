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

const Navigation = (props) => {
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
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default Navigation;



//import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// const Navbar = () => {
//   const classes = useStyles();
//   return (
//   <AppBar position="static">
//     <Toolbar>
//       <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//         <MenuIcon />
//       </IconButton>
//       <Typography variant="h6" className={classes.title}>
//         Game Tracker
//       </Typography>
//       <Button color="inherit">Login</Button>
//     </Toolbar>
//   </AppBar>
//   )
// }