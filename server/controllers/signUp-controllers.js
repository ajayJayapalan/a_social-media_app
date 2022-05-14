const { firebaseConfig } = require("../utils/config");
const { db, getTime } = require("../utils/db");
const { createUser } = require("../utils/dbAuth");
const { validateSignup } = require("../utils/validate");

const postSignup = async (req, res, next) => {
  try {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      handle: req.body.handle,
    };

    const err = validateSignup(newUser);
    if (err) return res.status(400).json({ error: err });

    const doc = await db.doc(`/users/${newUser.handle}`).get();
    if (doc.exists)
      return res.status(400).json({ general: "This user is already exist" });

    const data = await createUser(newUser.email, newUser.password);
    //console.log("postSignup data 👉",data.user.accessToken)

    const blankImg = "blank.png";

    const userCred = {
      handle: newUser.handle,
      email: newUser.email,
      createdAt: getTime(),
      imgUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${blankImg}?alt=media`,
      userId: data.user.uid,
    };

    await db.doc(`/users/${newUser.handle}`).set(userCred);

    res.status(201).json({ token: data.user.accessToken });
  } catch (error) {
    console.log("postSignup 👉", error);

    if (error.code === "auth/email-already-in-use") {
      return res.status(400).json({ general: "Email is already in use." });
    } else {
      return res.status(500).json({ general: "Something went wrong." });
    }
  }
};

module.exports = {
  postSignup: postSignup,
};
