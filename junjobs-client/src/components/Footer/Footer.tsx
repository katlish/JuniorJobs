import React from 'react';
import { MDBFooter, MDBIcon} from 'mdb-react-ui-kit';
import classes from './Footer.module.css';

export default function Footer() {
  return (
    <MDBFooter className='mt-4 bg-dark text-grey'>
      <div className='d-flex justify-content-between p-3'>
        <div>
          &copy; {new Date().getFullYear()}{' '}
          <span>
            Katia Lishnevsky
          </span>
        </div>
        <div className='d-flex'>
          <a href="https://www.linkedin.com/in/katyalishnevsky/" target="_blank" rel="noopener noreferrer" className={classes.socialLinks}>
            <MDBIcon fab icon="linkedin" size='lg'/>
          </a>
          <a href="mailto:radistkakat89@gmail.com?subject=Hey%20Katia!" className={classes.socialLinks}>
            <MDBIcon far icon="envelope" size='lg'/>
          </a>
          <a href="https://github.com/katlish" target="_blank" rel="noopener noreferrer" className={classes.socialLinks}>
            <MDBIcon fab icon="github" size='lg'/>
          </a>
        </div>
      </div>
    </MDBFooter>
  );
}