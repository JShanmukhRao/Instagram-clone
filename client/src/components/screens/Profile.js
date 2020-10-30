import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Profile = () => {
  const [mypic, setPic] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => { return setPic(result.posts)});
  }, []);
  
  
  return (
    <>
      {state ? (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "18px auto",
              borderBottom: "1px solid",
            }}
          >
            <div>
              <img
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                alt="Post"
                src={state.pic}
              />
              <Link to="/changeprofile">
                <i className="material-icons">camera_alt</i>
              </Link>
            </div>
            <div>
              <h5>{state ? state.name : "loading"}</h5>
              <h6>{state ? state.email : "loading"}</h6>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                <h6>{mypic.length > 0 ? mypic.length : 0} post</h6>
                <h6>{state.followers.length + "  "} followers</h6>
                <h6>{state.following.length + "  "} following</h6>
              </div>
            </div>
          </div>

          <div className="gallery">
            {mypic.length > 0
              ? mypic.map((item) => {
                  return (
                    <img
                      key={item._id}
                      className="item"
                      alt={item.title}
                      src={item.photo}
                    />
                  );
                })
              : ""}
          </div>
        </div>
      ) : (
        "loading"
      )}
    </>
  );
};

export default Profile;
