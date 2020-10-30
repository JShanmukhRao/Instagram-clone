import React, { useContext,useRef ,useEffect,useState} from "react";
import { Link,useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css"
const Navbar = () => {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);
  const renderList = () => {
    if (state) {
      return [
        <li key={100}>
          <i
            className="large material-icons modal-trigger"
            data-target="modal1"
            style={{color:"black"}}
          >
            search
          </i>
        </li>,
        <li key={1}>
          <Link className="nav-color" to="/profile">
            <img className="mini-profile" src={state.pic} />
            {"  "} Profile
          </Link>
        </li>,
        <li key={2}>
          <Link className="nav-color" to="/create">
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
            {"  "}Create Post
          </Link>
        </li>,
        ,
        <li key={10}>
          <Link className="nav-color" to="/followingpost">
            My Following Post
          </Link>
        </li>,
        <li key={3}>
          <button
            className="btn #c62828 red darken-3"
            type="submit"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/signin");
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li key={4}>
          <Link className="nav-color" to="/signin">
            Login{" "}
          </Link>
        </li>,

        <li className="nav-color" key={5}>
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };
  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        setUserDetails(results.user);
      });
  };
  /*
{
                userDetails.map(item=>{
                  return <li key={item._id} className="collection-item" >{item.email}</li>
                })
              }
  */
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/" : "/signin"} className="brand-logo ">
         Instagram
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down ">
          {renderList()}
        </ul>
      </div>

      <div
        id="modal1"
        className="modal"
        ref={searchModal}
        style={{ color: "black" }}
      >
        <div className="modal-content">
          <input
            type="text"
            placeholder="Search users"
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
          <ul class="collection">
            {userDetails.map((item) => {
              return (
               <Link
                      to={
                        state._id !== item._id
                          ? "/profile/" + item._id
                          : "/profile"
                      }
                      onClick={()=>{M.Modal.getInstance(searchModal.current).close()
                         setSearch('')}}
                    >  <li key={item._id} className="collection-item">
                  {item.email}
                </li></Link>
              );
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <button className="modal-close waves-effect waves-green btn-flat" onClick={()=> setSearch('')}>
            Close
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
