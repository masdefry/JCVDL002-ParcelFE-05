import React from "react";
import { Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, NavbarBrand, NavbarText, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/user';

class MyNavbar extends React.Component {

render() {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <NavbarBrand style={{color:"white"}} >Parcel Group 5</NavbarBrand>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <NavLink href="/home">Home</NavLink>
                        <span class="sr-only">(current)</span>
                    </li>
                    <li class="nav-item">
                        <NavLink href="/">About</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink href="/">Services</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink href="/">Contact</NavLink>
                    </li>
                    <li class="nav-item dropdown">
                    {
                        this.props.userGlobal.username ?
                        <>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Hello, {this.props.userGlobal.username}
                                </DropdownToggle>
                                <DropdownMenu end>
                                    <DropdownItem>
                                        <Link to="/cart">Cart
                                        <span class="badge bg-dark text-white ms-1 rounded-pill">0</span>
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/history">History</Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={this.props.logoutUser}>
                                        Logout
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    {
                                        this.props.userGlobal.role === "admin" ?
                                        <DropdownItem>
                                            <Link to="/admin">Admin</Link>
                                        </DropdownItem>
                                        : null
                                    }
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </> :
                        <NavbarText>
                            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                        </NavbarText>
                    }
                    </li>
                    </ul>
                </div>
            </div>
        </nav>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
    cartGlobal: state.cart,
  }
}

const mapDispatchToProps = {
  logoutUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);