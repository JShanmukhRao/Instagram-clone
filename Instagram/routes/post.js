const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const requireLogin = require("../middleware/requireLogin");

router.get("/post", requireLogin, (req, res) => {
  Post.find()
    .populate("comments.postedBy", "_id name")

    .populate("postedBy", "_id name pic")
    .sort('-createdAt')
    .then((post) => {
      res.json({
        posts: post,
      });
    });
});

router.post("/createpost", requireLogin, (req, res) => {
  const { title, body, pic } = req.body;
  console.log(title, body, pic);
  if (!title || !body || !pic) {
    return res.status(422).json({
      err: "Required all fields",
    });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    photo: pic,
    postedBy: req.user,
  });
  post
    .save()
    .then((saved) => {
      console.log(saved);
      res.json({
        post: saved,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/followingpost", requireLogin, (req, res) => {
  Post.find({ postedBy: { $in: req.user.following } })
    .populate("comments.postedBy", "_id name")

    .populate("postedBy", "_id name pic followers following")
    .sort("-createdAt")

    .then((post) => {
      res.json({
        posts: post,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/mypost", requireLogin, (req, res) => {
  const { _id } = req.user;
  Post.find({ postedBy: _id })
    .populate("postedBy", "_id name followers following")
    .then((post) => {
      res.json({
        posts: post,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $addToSet: { likes: req.user.id },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name ")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ err });
      } else {
        res.json(result);
      }
    });
});
router.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user.id },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name pic")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ err });
      } else {
        res.json(result);
      }
    });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name pic")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ err });
      } else {
        res.json(result);
      }
    });
});

router.delete('/delete/:postid',requireLogin,(req,res)=>{

Post.findOne({_id:req.params.postid})
.populate("postedBy","_id")
.exec((err,post)=>{
    if(err || !post)
    {
        return res.status(422).json(err)
    }
    if(post.postedBy._id.toString()===req.user._id.toString())
    {
       post.remove()
       .then(result=>{
           res.json(result)
       }).catch(err=>{
           console.log(err)
       })
    }
})

})
module.exports = router;
