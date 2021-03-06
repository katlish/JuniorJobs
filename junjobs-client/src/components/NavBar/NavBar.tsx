import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBCollapse,
  MDBContainer,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarBrand,
  MDBBtn } from 'mdb-react-ui-kit';
import { INavBarProps } from "../../types";

const NavBarMDB = ({ user, loggedIn, logout }: INavBarProps) => {
  const [showBasic, setShowBasic] = useState(false);

  return (
      <MDBNavbar expand='lg' dark bgColor='dark' className="sticky-top shadow-1-strong">
        <MDBContainer fluid>
          <MDBNavbarBrand href='/'>JUNIOR JOBS</MDBNavbarBrand>
          <MDBNavbarToggler
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className='mb-2 mb-lg-0'>
              <Link className="nav-link" to="/">
                JOBS
              </Link>
              <Link className="nav-link" to="/candidates">
                CANDIDATES
              </Link>
            </MDBNavbarNav>

            <MDBNavbarNav className='d-flex justify-content-end mb-2 mb-lg-0'>
              {!loggedIn ? (
                <Link className="nav-link" to="/login">
                  LOG IN
                </Link>
              ) : (
                  <div>
                    <MDBBtn color='light' onClick={logout} className="text-nowrap">
                      LOG OUT
                    </MDBBtn>
                  </div>
            )}
            </MDBNavbarNav>
          </MDBCollapse>
          
        </MDBContainer>
      </MDBNavbar>
  );
}

export default NavBarMDB;