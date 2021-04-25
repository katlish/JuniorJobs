import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import JobsPage from './containers/JobsPage';
import CandidatesPage from "./containers/CandidatesPage";
import { logIn, logOut } from "./store/actions/user";
import Auth from "./components/Auth";
import { LoginData } from "./types";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.data);
  const loggedIn = useSelector((state: any) => state.user.loggedIn);

  // useEffect(() => {
  //   dispatch({ type: actions.USER_LOGIN_BEGIN });
  // }, []);

  // const logindata = {
  //   email: "kattest@cc.com",
  //   password: "240689"
  // };

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
              <Redirect to="/success" />
            )}
          </Route>
          <Route path="/success" exact>
            <div>Success! {user?.email}</div>
          </Route>
        </Switch>
      </Container>
    </div>
  );
};

export default App;
