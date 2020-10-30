import React, {  useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
const CreatePost = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
 
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
                const user=JSON.parse(localStorage.getItem("user"))
let data=""
      fetch("/changeprofile", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((result) => {

        return(
            data=result.pic,
                        dispatch({
              type: "PROFILEUPDATE",
              payload: data,
            }),
            user.pic=data,
             localStorage.setItem("user", JSON.stringify(user))
            ,
            history.push("/profile")
        )
          }
        )
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "shubinsta-clone008");
    fetch("https://api.cloudinary.com/v1_1/shubinsta-clone008/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));

  
  };
  return (
    <div>
      <div
        className="card input-field"
        style={{
          margin: "30px auto",
          maxWidth: "500px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div className="file-field input-field">
          <div className="btn blue darken-1">
            <span>Upload Image</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path-validate" type="text" />
          </div>
        </div>
        <button
          className="btn waves-effect waves-light blue darken-1"
          onClick={postDetails}
        >
          Submit Post
        </button>
      </div>
    </div>
  );
};
export default CreatePost;
