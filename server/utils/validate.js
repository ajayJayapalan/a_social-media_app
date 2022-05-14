const Joi = require("Joi");

const validateSignup = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(4).required().label("Password"),
    confirmPassword: Joi.any()
      .valid(Joi.ref("password"))
      .label("Confirm password")
      .messages({ "any.only": "{{#label}} does not match" })
      .required(),
    handle: Joi.string().required().label("Username"),
  });

  const options = {
    abortEarly: false,
    errors: {
      wrap: {
        label: "",
      },
    },
  };

  const result = schema.validate(data, options);

  if (!result.error) return null;

  const errors = {};
  for (let item of result.error.details) errors[item.path[0]] = item.message;

  return errors;
};

const validateLogin = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(4).required().label("Password"),
  });

  const options = {
    abortEarly: false,
    errors: {
      wrap: {
        label: "",
      },
    },
  };

  const result = schema.validate(data, options);

  if (!result.error) return null;

  const errors = {};
  for (let item of result.error.details) errors[item.path[0]] = item.message;

  return errors;
};

const reduceUserDetails = (data) => {
  let userDetails = {};

  if (!!data?.bio?.trim()) userDetails.bio = data.bio;
  if (!!data?.website?.trim()) {
    // https://website.com
    if (data.website.trim().substring(0, 4) !== "http") {
      userDetails.website = `http://${data.website.trim()}`;
    } else userDetails.website = data.website;
  }
  if (!!data?.location?.trim()) userDetails.location = data.location;

  return userDetails;
};

module.exports = {
  validateSignup,
  validateLogin,
  reduceUserDetails,
};
