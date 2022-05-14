const { db, getTime } = require("../utils/db");
const {
  notificationOnCreate,
  deleteNotificationOnUnLike,
  onScreamDelete,
} = require("../utils/triggers");

const getScream = async (req, res, next) => {
  try {
    const data = await db
      .collection("screams")
      .orderBy("createdAt", "desc")
      .get();

    const arr = [];
    data.forEach((doc) =>
      arr.push({
        screamId: doc.id,
        ...doc.data(),
      })
    );

    res.json(arr);
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
    console.log("getScream 👉", error);
  }
};

const postScream = async (req, res) => {
  try {
    if (req.body.body.trim() === "") {
      return res.status(400).json({ body: "Body must not be empty" });
    }

    const newScream = {
      body: req.body.body,
      userHandle: req.user.handle,
      userImage: req.user.imgUrl,
      createdAt: getTime(),
      likeCount: 0,
      commentCount: 0,
    };

    const doc = await db.collection("screams").add(newScream);

    const resScream = newScream;
    resScream.screamId = doc.id;

    res.json({ resScream });
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
    console.log("postScream  👉", error);
  }
};

const getSingleScream = (req, res) => {
  let screamData = {};
  db.doc(`/screams/${req.params.screamId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream not found" });
      }
      // adding user data
      screamData = doc.data();
      screamData.screamId = doc.id;
      return (
        db
          .collection("comments")
          //.orderBy('createdAt', 'desc')
          .where("screamId", "==", req.params.screamId)
          .get()
      );
    })
    .then((data) => {
      screamData.comments = [];
      data.forEach((doc) => {
        screamData.comments.push(doc.data());
      });
      return res.json(screamData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

const postComment = (req, res) => {
  if (req.body.body.trim() === "")
    return res.status(400).json({ comment: "Must not be empty" });

  const newComment = {
    body: req.body.body,
    createdAt: getTime(),
    screamId: req.params.screamId,
    userHandle: req.user.handle,
    userImage: req.user.imgUrl,
  };

  let snapshot = {
    type: "comment",
    userHandle: req.user.handle,
    screamId: req.params.screamId,
    id: "",
  };

  db.doc(`/screams/${req.params.screamId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream not found" });
      }
      // previous refrence of doc
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
      return db.collection("comments").add(newComment);
    })
    .then(({ id }) => {
      snapshot.id = id;
      res.json(newComment);
      notificationOnCreate(snapshot);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    });
};

const postLike = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("screamId", "==", req.params.screamId)
    .limit(1);

  const screamDocument = db.doc(`/screams/${req.params.screamId}`);

  let screamData;
  let snapshot = {
    type: "like",
    userHandle: req.user.handle,
    screamId: req.params.screamId,
    id: "",
  };

  screamDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Scream not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("likes")
          .add({
            screamId: req.params.screamId,
            userHandle: req.user.handle,
          })
          .then((data) => {
            snapshot.id = data.id;
            screamData.likeCount++;
            return screamDocument.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            res.json(screamData);
            notificationOnCreate(snapshot);
          });
      } else {
        return res.status(400).json({ error: "Scream already liked" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

const postUnLike = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("screamId", "==", req.params.screamId)
    .limit(1);

  const screamDocument = db.doc(`/screams/${req.params.screamId}`);

  let screamData;

  screamDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Scream not found" });
      }
    })
    .then((data) => {
      if (!data.empty) {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            screamData.likeCount--;
            return screamDocument.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            res.json(screamData);
            deleteNotificationOnUnLike({ id: data.docs[0].id });
          });
      } else {
        return res.status(400).json({ error: "Scream not liked" });
      }
    })
    .catch((err) => {
      console.error(err);

      res.status(500).json({ error: err.code });
    });
};

const deleteScream = (req, res) => {
  const document = db.doc(`/screams/${req.params.screamId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream not found" });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Scream deleted successfully" });
      onScreamDelete({ screamId: req.params.screamId });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

module.exports = {
  getScream,
  postScream,
  getSingleScream,
  postComment,
  postLike,
  postUnLike,
  deleteScream,
};
