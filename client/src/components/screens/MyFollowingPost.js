import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
const Home = () => {
  const [data, setData] = useState([]);

  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/followingpost", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      }
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);
  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unLikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletePost = (id) => {
    console.log("de");
    fetch(`/delete/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newdata = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newdata);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
    {state &&state.following.length==0? <h2>No Friends</h2>:
    <>
      {data.length>0 ? (
        <div className="home">
          {data &&
            data.map((item) => {
              return (
                <div key={item._id} className="card home-card">
                  <h5 style={{ padding: "6px" }}>
                    <Link
                      to={
                        state._id !== item.postedBy._id
                          ? "/profile/" + item.postedBy._id
                          : "/profile"
                      }
                    >
                      {item.postedBy.name}
                    </Link>

                    {item.postedBy._id == state._id && (
                      <i
                        className="material-icons"
                        style={{
                          float: "right",
                          borderBottom: "4px solid black",
                        }}
                        onClick={() => deletePost(item._id)}
                      >
                        delete
                      </i>
                    )}
                  </h5>
                  <div className="card-image">
                    <img alt="Post" src={item.photo} />
                  </div>

                  <div className="card-content">
                    <i className="material-icons" style={{ color: "red" }}>
                      favorite
                    </i>
                    {!item.likes.includes(state._id) ? (
                      <i
                        className="material-icons"
                        onClick={() => likePost(item._id)}
                      >
                        thumb_up
                      </i>
                    ) : (
                      <i
                        className="material-icons"
                        onClick={() => unLikePost(item._id)}
                      >
                        thumb_down
                      </i>
                    )}
                    <h6>{item.likes.length} likes</h6>
                    <h6>{item.title}</h6>
                    <p>{item.body}</p>
                    {item.comments.map((record) => {
                      return (
                        <h6 key={record._id}>
                          <span style={{ fontWeight: "500" }}>
                            {record.postedBy.name}
                          </span>
                          {"  " + record.text}
                        </h6>
                      );
                    })}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        makeComment(e.target[0].value, item._id);
                      }}
                    >
                      <input type="text" placeholder="Add a comment" />
                    </form>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <h2>loading...!</h2>
      )}
      </>}
    </>
  );
};
export default Home;
