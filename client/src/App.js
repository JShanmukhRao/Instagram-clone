import React, { createContext, useEffect, useReducer, useContext } from "react";
import Navbar from "./components/Navebar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import "./App.css";
import Home from "./components/screens/Home";
import Signup from "./components/screens/Signup";
import Signin from "./components/screens/Signin";
import Profile from "./components/screens/Profile";
import CreatePost from "./components/screens/CreatePost";
import { reducer, initialState } from "./reducers/userReducer";
import UserProfile from './components/screens/UserProfile'
import Subscribe from './components/screens/MyFollowingPost'
import ChangeProfile from './components/screens/ChangeProfile'
//<Navbar />
export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
let mounted=true;
    const user = JSON.parse(localStorage.getItem("user"));
 

   
    if (user && mounted ) {
      dispatch({ type: "USER", payload: user });
    } 
  else {
      history.push("/signin");
    }
    return ()=>mounted=false
  }, []);
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/create" component={CreatePost} />
      <Route exact path="/profile/:userid" component={UserProfile} />
      <Route exact path="/followingpost" component={Subscribe} />
      <Route exact path="/changeprofile" component={ChangeProfile} />
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
