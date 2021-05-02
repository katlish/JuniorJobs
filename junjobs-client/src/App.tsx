import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Auth from "./components/Auth";
import JobsPage from './containers/JobsPage';
import CandidatesPage from "./containers/CandidatesPage";
import AddCandidatePage from "./containers/AddCandidatePage";
import { logIn, logOut, setUserToken } from "./store/actions/user";
import { addOrUpdateCandidate } from "./store/actions/candidates";
import { LoginData, Candidate } from "./types";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.data);
  const loggedIn = useSelector((state: any) => state.user.loggedIn);
  const token = localStorage.getItem('token');

	useEffect(() => {
		if (token) {
			dispatch(setUserToken(token));
		}
	}, []);

  //FIXME: show success message on submit
  const addCandidate = (candidate: Candidate) => {
    dispatch(addOrUpdateCandidate(candidate));
  };

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
                logIn={(userData: LoginData) => dispatch(logIn(userData))}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/add-my-candidate" exact>
            {user?.email ? (
              <AddCandidatePage email={user?.email} submitHandler={addCandidate}/>
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
