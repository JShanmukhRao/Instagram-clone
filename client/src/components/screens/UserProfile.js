import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import {useParams} from 'react-router-dom'

const Profile = () => {
    
  const [userProfile, setProfile] = useState(null);
  const[user,setUser]=useState(null)
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      }
    })
      .then((res) => res.json())
      .then((result) =>{ 
            setUser(result.user); 
        setProfile(result)
    
      });
  }, []);

const follow=(userId)=>{
   let user = JSON.parse(localStorage.getItem("user"));
  fetch("/follow", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify({
      userId,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
     return (
       console.log(result.currentUser),
       setUser(result.otherUser),
       dispatch({
         type: "UPDATE",
         payload: {
           following: result.currentUser.following,
           followers: result.currentUser.followers,
         },
       }),
       (user=result.currentUser),
       console.log(user),
       localStorage.setItem("user", JSON.stringify(user))
     );
    })
    .catch((err) => {
      console.log(err);
    });
}


const unfollow = (userId) => {
     const user = JSON.parse(localStorage.getItem("user"));

  fetch("/unfollow", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify({
      userId,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      return (
        setUser(result.otherUser),
        dispatch({
          type: "UPDATE",
          payload: {
            following: result.currentUser.following,
            followers: result.currentUser.followers,
          },
        }),
        (user.followers = result.currentUser.followers),
        localStorage.setItem("user", JSON.stringify(user))
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
  return (
    <>
      {userProfile ? (
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
                src="https://images.unsplash.com/photo-1492681290082-e932832941e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              />
            </div>
            <div>
              <h5>{userProfile.user.name}</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                <h6>{userProfile.posts.length} post</h6>
                <h6>{user.followers.length +"  "} followers</h6>
                <h6>{user.following.length + "  "} following</h6>
              </div>
              {!user.followers.includes(state._id) ? (
                <button
                  style={{
                    margin: "10px",
                  }}
                  className="btn waves-effect waves-light blue darken-1"
                  onClick={() => follow(userid)}
                >
                  Follow
                </button>
              ) : (
                <button
                  style={{
                    margin: "10px",
                  }}
                  className="btn waves-effect waves-light blue darken-1"
                  onClick={() => unfollow(userid)}
                >
                  Unfollow
                </button>
              )}
            </div>
          </div>

          <div className="gallery">
            {userProfile.posts.map((item) => {
              return (
                <img
                  key={item._id}
                  className="item"
                  alt={item.title}
                  src={item.photo}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <h2>loading...!</h2>
      )}
    </>
  );
};

export default Profile;
