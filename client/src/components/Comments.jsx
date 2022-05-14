import React, { Fragment } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { getTime } from "../utils/utility-functions";

const useStyles = makeStyles({
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
    marginLeft: " 150px",
  },
  commentData: {
    marginLeft: 0,
  },
  inVisibleSeparator: {
    visibility: "hidden",
  },
  visibleSeparator: {
    position: "relative",
    zIndex: "10",
    border: "1px solid lightgray",
    margin: 0,
    marginLeft: "150px",
    width: "100%",
    marginTop: 5,
    marginBottom: 15,
  },
});

const Comments = ({ comments }) => {
  const classes = useStyles();
  return (
    <Grid container>
      {comments.map((comment, index) => {
        const { body, createdAt, userImage, userHandle } = comment;
        return (
          <Fragment key={createdAt}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={5}>
                  <img
                    src={userImage}
                    alt="comment"
                    className={classes.commentImage}
                  />
                </Grid>
                <Grid item sm={5}>
                  <div className={classes.commentData}>
                    <Typography
                      variant="h5"
                      component={Link}
                      to={`/users/${userHandle}`}
                      color="primary"
                    >
                      {userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {createdAt && getTime(createdAt, false)}
                    </Typography>
                    <hr className={classes.inVisibleSeparator} />
                    <Typography variabnt="body1">{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && (
              <hr className={classes.visibleSeparator} />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
};

export default Comments;
