import React from "react";
import { Navbar, Nav, Button, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IHeaderProps } from "../../types";

const Header = ({ user, loggedIn, logout }: IHeaderProps) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link className="navbar-brand" to="/">
          JUNIOR JOBS
        </Link>
        {!loggedIn ? (
          <Link className="nav-link" to="/auth">
            LOG IN
          </Link>
        ) : (
          <div className="d-flex align-items-center">
            <span className="text-white">Hi, {user.email}!</span>
            <Button onClick={logout} as="a" variant="link" className="nav-link">
              LOG OUT
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
