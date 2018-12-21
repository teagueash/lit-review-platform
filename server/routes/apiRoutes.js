const AWS = require("aws-sdk");
const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const apiConstants = require("../constants/apiConstants");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const flattenDeep = require("../utils/utils");
const util = require("util");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
// temp, proof of concept. change to use buffer and upload to S3 later
const storage = multer.memoryStorage({
  // destination: (req, file, callback) => {
  //   callback(null, "./");
  // },
  // filename: (req, file, callback) => {
  //   callback(null, file.originalname.replace(/ /g, "_"));
  // }
});
const upload = multer({ storage: storage });
// const upload = multer({ dest: "./" });

module.exports = app => {
  app.get("/user", (req, res) => {
    res.status(200).json({
      message: "You're authorized to see this page!"
    });
  });

  // refactor this...
  app.post("/admin", (req, res) => {
    const { action } = req.body;

    switch (action) {
      // get all student users
      case apiConstants.GET_ALL:
        User.find({ role: "student" }, (err, users) => {
          if (err) {
            return res.status(500).json({
              error: "Could not retrieve users from the database"
            });
          }

          var userArr = [];

          users.forEach(user => {
            const { name, _id } = user;
            userArr.push({ name: name, id: _id });
          });
          return res.status(200).json({
            users: userArr
          });
        }).sort("name");

      // get a user
      case apiConstants.GET_USER:
        return {};
      // authorize a user for registration
      case apiConstants.AUTHORIZE_USER:
        return {};
      // remove a user
      case apiConstants.REMOVE_USER:
        return {};
    }
  });

  // assign a lit review
  app.post("/assignTask", (req, res) => {
    const { authorization, details } = req.body.headers;

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token detected" });
    }
    // verify token and perform update
    jwt.verify(token, keys.jwtSecret, (err, user) => {
      if (err) throw err;

      User.findById(
        {
          _id: user._id
        },
        (err, user) => {
          if (err) throw err;

          if (user.role === "admin") {
            const { name, id, topic, dueDate } = details;

            const newDoc = {
              topic: topic,
              date: dueDate,
              assignedTo: name,
              submitted: false
            };
            //user is authorized, find assinged user and update
            User.findByIdAndUpdate(
              { _id: id },
              { $addToSet: { documents: newDoc } },
              (err, user) => {
                if (err) {
                  console.log("error! ", err);
                  return res.status(400).json({
                    message: "Unable to update user's assigned lit review"
                  });
                }
                return res.status(200).json({
                  message: "success"
                });
              }
            );
          } else {
            // user is not authorized
            return res.status(401).json({
              message: "You are not an authorized user"
            });
          }
        }
      );
    });
  });

  // return all lit reviews
  app.get("/viewTasks", (req, res) => {
    User.find({ "documents.0": { $exists: true } }, (err, documents) => {
      if (err) {
        return res.status(400).json({
          error: err,
          message: "Unable to perform the request"
        });
      }
      const allReviews = documents.map(a => a.documents);
      const flattenedReviews = flattenDeep(allReviews);
      return res.status(200).json(flattenedReviews);
    });
  });

  // return all lit reviews
  app.get("/viewMyTasks", (req, res) => {
    const { authorization } = req.headers;

    // format token
    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token detected" });
    }
    // verify token and perform update
    jwt.verify(token, keys.jwtSecret, (err, user) => {
      if (err) throw err;
      const { _id } = user;

      User.findById(_id, "documents", (err, doc) => {
        if (err) {
          return res.status(400).json({
            error: err,
            message: "Unable to perform the request"
          });
        }
        const flattenedReviews = flattenDeep(doc.documents);
        return res.status(200).json(flattenedReviews);
      });
    });
  });

  app.get("/viewUpcomingTasks", (req, res) => {
    const { start, end } = req.headers;
    User.aggregate([
      {
        $project: {
          items: {
            $filter: {
              input: "$documents",
              as: "doc",
              cond: {
                $and: [
                  { $gte: ["$$doc.date", new Date(start)] },
                  { $lt: ["$$doc.date", new Date(end)] }
                ]
              }
            }
          }
        }
      }
    ]).exec((err, docs) => {
      if (err) {
        return res.json(400).json({
          error: err,
          message: "Unable to perform the request"
        });
      }
      const allReviews = docs.map(a => a.items);
      const flattenedReviews = flattenDeep(allReviews);
      return res.status(200).json(flattenedReviews);
    });
  });

  app.get("/viewMyUpcomingTasks", (req, res) => {
    const { start, end, authorization } = req.headers;

    // format token
    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token detected" });
    }
    // verify token and perform update
    jwt.verify(token, keys.jwtSecret, (err, user) => {
      if (err) throw err;
      const { _id } = user;
      // convert string _id to ObjectId _id as aggregate autocasting does not occur
      const mongooseID = mongoose.Types.ObjectId(_id);

      User.aggregate([
        { $match: { _id: mongooseID } },
        {
          $project: {
            items: {
              $filter: {
                input: "$documents",
                as: "doc",
                cond: {
                  $and: [
                    { $gte: ["$$doc.date", new Date(start)] },
                    { $lt: ["$$doc.date", new Date(end)] }
                  ]
                }
              }
            }
          }
        }
      ]).exec((err, docs) => {
        if (err) {
          return res.json(400).json({
            error: err,
            message: "Unable to perform the request"
          });
        } else {
          const allReviews = docs.map(a => a.items);
          const flattenedReviews = flattenDeep(allReviews);
          return res.status(200).json(flattenedReviews);
        }
      });
    });
  });

  // submit docx to S3
  app.post("/submitTask", upload.single("file"), (req, res) => {
    const doc = JSON.parse(req.body.reviewDetails);
    const { topic, date, assignedTo } = doc;
    const { reviewDetails } = req.body;
    const { buffer, originalname } = req.file;
    const { authorization } = req.headers;

    // format token
    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token detected" });
    }
    // verify token and perform update
    jwt.verify(token, keys.jwtSecret, (err, user) => {
      if (err) throw err;

      const s3 = new AWS.S3();
      const filePath = `${assignedTo}/${originalname.replace(/ /g, "_")}`;

      const params = {
        Bucket: keys.AWSbucketName,
        Body: buffer,
        Key: filePath
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.log("Error", err);
          return res.status(500).json({
            message: "failure!"
          });
        }
        if (data) {
          console.log("Uploaded in: ", data.Location);

          // update mongoose schema to indicate assignment has been turned in
          User.update(
            {
              _id: user._id,
              "documents.topic": topic
            },
            {
              $set: {
                "documents.$.submitted": true,
                "documents.$.path": filePath
              }
            },
            err => {
              if (err) {
                return res
                  .status(400)
                  .json({ message: "Unable to update lit review" });
              } else {
                return res.status(200).json({
                  message: "success"
                });
              }
            }
          );
        }
      });
    });
  });

  // remove document from assigned user
  app.post("/deleteTask", (req, res) => {
    const { data } = req.body;

    User.findOneAndUpdate(
      { "documents._id": data },
      { $pull: { documents: { _id: data } } },
      err => {
        if (err) {
          return res.status(400).json({
            message: "Unable to delete document"
          });
        }
        return res.status(200).json({
          message: "Document successfully deleted"
        });
      }
    );
  });

  app.post("/downloadTask", (req, res) => {
    const { authorization } = req.headers;
    const { assignedTo, topic } = req.body.data;

    // format token
    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token detected" });
    }

    // verify token and perform update
    jwt.verify(token, keys.jwtSecret, (err, user) => {
      if (err) throw err;

      const s3 = new AWS.S3();

      User.find({ name: assignedTo }, "documents", (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          const target = doc[0].documents.filter(
            element => element.topic === topic
          );
          const pathName = target[0].path;

          const params = {
            Bucket: keys.AWSbucketName,
            Key: pathName
          };

          s3.getObject(params, (err, data) => {
            if (err) {
              console.log(err, "err");
              return res.status(400).json({ message: "failure" });
            }
            return res.status(200).json(data);
          });
        }
      });
    });
  });

  app.post("/authorizeUser", (req, res) => {
    const { authorization, users } = req.body.headers;
    const { studentID } = users;

    // format token and studentID
    const formattedID = studentID.replace(/-/g, "");
    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token detected" });
    }
    // verify token and perform update
    jwt.verify(token, keys.jwtSecret, (err, user) => {
      if (err) throw err;
      const { _id } = user;
      User.findById(
        {
          _id: _id
        },
        (err, user) => {
          if (err) throw err;

          if (user.role === "admin") {
            // check if student ID already present
            const { authorizedUsers } = user;
            if (authorizedUsers.includes(formattedID)) {
              return res.status(400).json({
                message: "This student ID already exists inside the database"
              });
            }

            //user is authorized, find assinged user and update
            User.findByIdAndUpdate(
              { _id: _id },
              { $addToSet: { authorizedUsers: formattedID } },
              (err, user) => {
                if (err) {
                  return res.status(500).json({
                    message: "Unable to authorize user"
                  });
                }

                return res.status(200).json({
                  message: "User successfully authorized!"
                });
              }
            );
          } else {
            // user is not authorized
            return res.status(401).json({
              message: "You are not an authorized user"
            });
          }
        }
      );
    });
  });
};
