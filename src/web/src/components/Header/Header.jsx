import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from "../../store/auth/actions";

function Header() {
  const user = useSelector(state => state?.auth?.user);

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand href="#home">Bolttech ToDo List</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown title={user.name} id="basic-nav-dropdown">
              <Link to="/logout" className='dropdown-item'>Logout</Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;