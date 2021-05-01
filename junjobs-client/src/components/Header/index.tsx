import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { IHeaderProps } from "../../types";

const Header = ({ user, loggedIn, logout }: IHeaderProps) => {

  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
      <Navbar.Brand href="/">JUNIOR JOBS</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav>
              {loggedIn && <p className={`${classes.usernameMobile} my-2`}>Hi, {user.email}</p>}

              <Link className="nav-link" to="/candidates">
              CANDIDATES
              </Link>
              <Link className="nav-link" to="/">
                JOBS
              </Link>
          </Nav>
        </Nav>
        <Nav>
          {!loggedIn ? (
            <Link className="nav-link" to="/auth">
              LOG IN
            </Link>
          ) : (
            <>
              <Link className="nav-link" to="/add-my-candidate">
                ADD MY CANDIDATURE
              </Link>
              
              <p className={`${classes.username} mx-3 my-auto`}>Hi, {user.email}</p>
              
              <Button className={`${classes.logout} nav-link`} onClick={logout} as="a" variant="link">
                LOG OUT
              </Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
