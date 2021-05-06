import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Auth from "./components/Auth";
import JobsPage from './containers/JobsPage';
import CandidatesPage from "./containers/CandidatesPage";
import AddCandidatePage from "./containers/AddCandidatePage";
import { logIn, signUp, logOut, setUserToken } from "./store/actions/user";
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
		}
	}, []);

  return (
    <div>
      <Header 
        loggedIn={loggedIn}
				user={user}
				logout={() => dispatch(logOut())} />
      <Container>
        <Switch>
          <Route path="/" exact>
            <JobsPage />
          </Route>
          <Route path="/candidates" exact>
            <CandidatesPage />
          </Route>
          <Route path="/auth" exact>
            {!user?.email ? (
              <Auth
                show={true}
                logIn={(userData: SignInData) => dispatch(logIn(userData))}
                signUp={(userData: SignInData) => dispatch(signUp(userData))}
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
      </Container>
    </div>
  );
};

export default App;
