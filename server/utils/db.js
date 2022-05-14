const admin = require("firebase-admin");
const firebase = require("firebase/app");
const config = require("./config");

admin.initializeApp(config.firebaseConfig);
firebase.initializeApp(config.firebaseConfig);

const db = admin.firestore();

const getTime = () => {
  return admin.firestore.Timestamp.fromDate(new Date());
};

module.exports = { admin, db, getTime };


