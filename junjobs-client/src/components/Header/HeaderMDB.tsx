import { Link } from "react-router-dom";
import { IHeaderProps } from "../../types";
import { userRole } from "../../store/constants/constants";
// import bgImg from "../../imgs/mountains.jpeg";
import bgImg from "../../imgs/robot.jpeg";

const HeaderMDB = ({ user, loggedIn }: IHeaderProps) => {
  return (
    <header>
      <div
        className='p-5 mb-5 text-center bg-image shadow-2-strong parallax'
        style={{ backgroundImage: `url(${bgImg})`, height: 400 }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>{!loggedIn ? "Welcome Dear Guest!" : `Hi, ${user.email} !`}</h1>
              
              {
                user?.role === userRole.CANDIDATE ?
                <Link className="btn btn-secondary btn-lg" to="/add-my-candidate">
                        ADD MY CANDIDATURE
                </Link>
                :
                user?.role === userRole.HR ?
                <Link className="btn btn-secondary btn-lg" to="#">
                        ADD NEW JOB
                </Link>
                :
                <Link className="btn btn-secondary btn-lg" to="/auth">
                        SIGN UP
                </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderMDB;