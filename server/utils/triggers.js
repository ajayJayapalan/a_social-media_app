const { db } = require("./db");

exports.notificationOnCreate = (snapshot) => {
  db.doc(`/screams/${snapshot.screamId}`)
    .get()
    .then((doc) => {
      if (doc.exists && doc.data().userHandle !== snapshot.userHandle) {
        return db.doc(`/notifications/${snapshot.id}`).set({
          createdAt: new Date().toISOString(),
          recipient: doc.data().userHandle,
          sender: snapshot.userHandle,
          type: snapshot.type,
          read: false,
          screamId: doc.id,
        });
      }
    })
    .catch((err) => console.error(err));
};

exports.deleteNotificationOnUnLike = (snapshot) => {
  return db
    .doc(`/notifications/${snapshot.id}`)
    .delete()
    .catch((err) => {
      console.error(err);
      return;
    });
};

exports.createNotificationOnComment = (snapshot) => {
  return db
    .doc(`/screams/${snapshot.data().screamId}`)
    .get()
    .then((doc) => {
      if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
        return db.doc(`/notifications/${snapshot.id}`).set({
          createdAt: new Date().toISOString(),
          recipient: doc.data().userHandle,
          sender: snapshot.data().userHandle,
          type: "comment",
          read: false,
          screamId: doc.id,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      return;
    });
};

exports.onUserImageChange = (snapshot) => {
  try {
    let batch1 = db.batch();
    let batch2 = db.batch();

    db.collection("screams")
      .where("userHandle", "==", snapshot.handle)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          const scream = db.doc(`/screams/${doc.id}`);
          batch1.update(scream, { userImage: snapshot.imgUrl });
        });
        batch1.commit();
      });

    db.collection("comments")
      .where("userHandle", "==", snapshot.handle)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          const comment = db.doc(`/comments/${doc.id}`);
          batch2.update(comment, { userImage: snapshot.imgUrl });
        });
        batch2.commit();
      });
  } catch (err) {
    console.error("Error during updating image", err);
  }
};

exports.onScreamDelete = (snapshot) => {
  const screamId = snapshot.screamId;
  const batch = db.batch();
  db
    .collection("comments")
    .where("screamId", "==", screamId)
    .get()
    .then((data) => {
      data.forEach((doc) => {
        batch.delete(db.doc(`/comments/${doc.id}`));
      });
      return db.collection("likes").where("screamId", "==", screamId).get();
    })
    .then((data) => {
      data.forEach((doc) => {
        batch.delete(db.doc(`/likes/${doc.id}`));
      });
      return db
        .collection("notifications")
        .where("screamId", "==", screamId)
        .get();
    })
    .then((data) => {
      data.forEach((doc) => {
        batch.delete(db.doc(`/notifications/${doc.id}`));
      });
      return batch.commit();
    })
    .catch((err) => console.error(err));
};
