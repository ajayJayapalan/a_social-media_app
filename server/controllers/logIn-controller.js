const axios = require("axios");
const { firebaseConfig } = require("../utils/config");
const { singinAuth } = require("../utils/dbAuth");
const { validateLogin } = require("../utils/validate");

const postLogin = async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };

    const err = validateLogin(user);
    if (err) return res.status(400).json({ error: err });

    const data = await singinAuth(user.email, user.password);
    // console.log("postLogin data 👉",data.user.refreshToken)

    res.status(201).json({
      token: data.user.accessToken,
      refreshToken: data.user.refreshToken,
    });
  } catch (error) {
    console.log("postLogin 👉", error);

    if (error.code === "auth/wrong-password") {
      return res.status(403).json({ general: "Entered password is wrong." });
    } else if (error.code === "auth/user-not-found") {
      return res.status(403).json({ general: "Please Singup first." });
    } else {
      return res.status(500).json({ error: error.code });
    }
  }
};

const refreshRoute =  (req, res) => {
  const qs = require("qs");
  const data = {
    grant_type: "refresh_token",
    refresh_token:
      req.headers.refreshtoken,
  };

  const options = {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(data),
    url: `https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.apiKey}`,
  };
  axios(options)
    .then((resp) => {
      res.json(resp.data);
    })
    .catch((err) => res.json(err));
};

module.exports = {
  postLogin: postLogin,
  refreshRoute,
};
