const auth = require("firebase/auth");

const createUser = async (email, password) => {
  const data = await auth.createUserWithEmailAndPassword(
    auth.getAuth(),
    email,
    password
  );

  return data;
};

const singinAuth = async (email, password) => {
  const data = await auth.signInWithEmailAndPassword(
    auth.getAuth(),
    email,
    password
  );

  return data
};

module.exports = {
  createUser,
  singinAuth
};
