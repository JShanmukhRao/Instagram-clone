import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
const [loading,setLoading]=useState(false)
  useEffect(()=>{
     if(url)
     {
       userFields();
     }
  },[url])
  const userFields = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "Invalid Email", classes: "#c62828 red darken-3" });
      setLoading(false);
      return;
    } else {
      fetch("/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
          pic: url,
          email,
        }),
      })
        .then((res) => res.json())

        .then((data) => {
          if (data.err) {
            M.toast({ html: data.err, classes: "#c62828 red darken-3" });
            setLoading(false);
            return;
          } else {
            M.toast({
              html: data.message,
              classes: "#43a047 green darken-1",
            });
            setLoading(false);
            history.push("/signin");
          }
        })
        .catch(
          (err) => M.toast({ html: err, classes: "#c62828 red darken-3" }),
        );
    }
  };
  const uploadPic = () => {
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
  const postData = () => {
    setLoading(true)
    
    if (image) {
      uploadPic();
      
    } else {
     
      userFields();
    }
  };
  return (
    <div className="mycard">
      <div className="card auth-card input-field ">
        <h2>MyFacebook</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn blue darken-1">
            <span>Upload Pic</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path-validate" type="text" />
          </div>
        </div>
        <button
          className="btn waves-effect waves-light blue darken-1"
          type="submit"
          onClick={postData}
          disabled={loading}
        >
        {loading?  <i className="fa fa-circle-o-notch fa-spin"></i> :""}Signup
        </button>
        <br></br>
        <Link to="/signin">Already have a account</Link>
      </div>
    </div>
  );
};
export default Signup;
