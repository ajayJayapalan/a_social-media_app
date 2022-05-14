const { admin, db } = require("../utils/db");

const FBAuth = async (req, res, next) => {
  try {
    let idToken;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(`Bearer `)
    ) {
      idToken = req.headers.authorization.split("Bearer ")[1];
    } else {
      console.error("No token found.");
      return res.status(403).json({ error: "Unauthorized" });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;

    const data = await db
      .collection("users")
      .where("userId", "==", req.user.uid)
      .limit(1)
      .get();
    req.user.handle = data.docs[0].data().handle;
    req.user.imgUrl = data.docs[0].data().imgUrl;
    return next();
  } catch (error) {
    console.error("Error while verifying token", error);
    return res.status(403).json(error);
  }
};

module.exports = {
  FBAuth,
};
