import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { getTime } from "../utils/utility-functions";

// REDUX
import { useDispatch, useSelector } from "react-redux";

// MUI
import MuiLink from "@mui/material/Link";
import { makeStyles } from "@mui/styles";
import { Button, Paper, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditIcon from "@mui/icons-material/Edit";
import { uploadImage } from "./../redux/actions/user-actions";
import EditDetails from "./EditDetails";
import MyButton from "./MyButton";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
    "& >a": {
      margin: 10,
    },
  },
  profile: {
    textAlign: "center",
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image ": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
      border: `2px solid lightblue`,
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: theme?.palette.primary.main,
        textDecoration: "none",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
}));

const Profile = () => {
  //   const theme = useTheme();
  //   console.log("theme", theme);
  const classes = useStyles();

  const editIconRef = useRef(null);
  const dispatch = useDispatch();

  const {
    credentials: { handle, createdAt, imgUrl, bio, website, location },
    loading,
    authenticated,
  } = useSelector((state) => state.user);

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    console.log(image);
    formData.append("image", image, image.name);
    dispatch(uploadImage(formData));
  };

  const handleEditPicture = () => {
    editIconRef.current.click();
  };

  let profileMarkup = !loading ? (
    authenticated ? (
      <>
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imgUrl} alt="profile" className="profile-image" />
              <input
                type="file"
                hidden="hidden"
                name="image"
                ref={editIconRef}
                onChange={handleImageChange}
              />
              <MyButton
                title="Edit / Add photo"
                className="button"
                onClick={handleEditPicture}
              >
                <EditIcon color="primary" />
              </MyButton>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MuiLink>
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <>
                  <LocationOnIcon color="primary" />
                  <span> {location}</span>
                  <hr />
                </>
              )}
              {website && (
                <>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                  <hr />
                </>
              )}
              <CalendarTodayIcon color="primary" />
              <span> Joined {getTime(createdAt, false)}</span>
              {/* logout */}
            </div>
            <EditDetails />
          </div>
        </Paper>
      </>
    ) : (
      <>
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found, please login.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </Paper>
      </>
    )
  ) : (
    <p>loading...</p>
  );

  return <>{profileMarkup}</>;
};

export default Profile;
