import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer } from 'mdb-react-ui-kit';
import { Redirect, Route, Switch } from "react-router-dom";
import NavBarMDB from "./components/NavBar/NavBar";
import HeaderMDB from "./components/Header/HeaderMDB";
import Footer from "./components/Footer/Footer";
import Auth from "./components/Auth";
import JobsPageNew from './containers/JobsPageNew';
import CandidatesPageNew from "./containers/CandidatesPageNew";
import AddCandidatePage from "./containers/AddCandidatePage";
import { logIn, signUp, logOut, setUserToken, getUserJobs } from "./store/actions/user";
import { fetchCandidates, addOrUpdateCandidate } from "./store/actions/candidates";
import { SignInData, Candidate } from "./types";
import { userRole } from "./store/constants/constants";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.data);
  const loggedIn = useSelector((state: any) => state.user.loggedIn);
  const token = localStorage.getItem('token');
  const candidates = useSelector((state: any) => state.candidates.data);
  

	useEffect(() => {
		if (token) {
			dispatch(setUserToken(token));
      dispatch(fetchCandidates());
      dispatch(getUserJobs());
		}
	}, []);

  return (
    <div style={{background: "#191918"}}>
      <NavBarMDB 
        loggedIn={loggedIn}
        user={user}
        logout={() => dispatch(logOut())}/>
      <HeaderMDB 
              loggedIn={loggedIn}
              user={user}/>
      <MDBContainer fluid className='min-vh-100 m-0 p-0'>
        <Switch>
          <Route path="/" exact>
            <JobsPageNew />
          </Route>
          <Route path="/candidates" exact>
            <CandidatesPageNew />
          </Route>
          <Route path="/auth" exact>
            <JobsPageNew />
            {!user?.email ? (
              <Auth
                show={true}
                logIn={(userData: SignInData) => dispatch(logIn(userData))}
                signUp={(userData: SignInData) => dispatch(signUp(userData))}
                type='signup'
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/login" exact>
            <JobsPageNew />
            {!user?.email ? (
              <Auth
                show={true}
                logIn={(userData: SignInData) => dispatch(logIn(userData))}
                signUp={(userData: SignInData) => dispatch(signUp(userData))}
                type='login'
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/add-my-candidate" exact>
            {user?.email && user?.role === userRole.CANDIDATE ? (
              <AddCandidatePage 
                email={user?.email} 
                existingCandidate={candidates.find((cand: Candidate) => cand.email === user.email)}
                submitHandler={(candidate: Candidate) => dispatch(addOrUpdateCandidate(candidate))}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
        </Switch>
      </MDBContainer>
      <Footer />
    </div>
  );
};

export default App;
