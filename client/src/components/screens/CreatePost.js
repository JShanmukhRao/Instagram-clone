import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

const CreatePost = () => {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.err) {
            M.toast({ html: data.err, classes: "#c62828 red darken-3" });
            setLoading(false);

            return;
          } else {
            setLoading(false);

            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  const postDetails = () => {
    setLoading(true);

    if(!image)
    {
        M.toast({ html: "Invalid Image", classes: "#c62828 red darken-3" });
        setLoading(false);
        return
    }
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
        <input
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
        <input
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          type="text"
        />
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
          disabled={loading}
        >
          {loading ? <i className="fa fa-circle-o-notch fa-spin"></i> : ""}
          Submit Post
        </button>
      </div>
    </div>
  );
};
export default CreatePost;
