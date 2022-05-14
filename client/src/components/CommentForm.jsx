import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitComment } from "../redux/actions/data-actions";

const useStyles = makeStyles({
  card: {
    display: "flex",
    marginBottom: 10,
    marginTop: 10,
  },
  img: {
    maxWidth: 150,
    height: 150,
    objectFit: "cover",
    padding: 0,
  },
});

const CommentForm = ({ id }) => {
  const classes = useStyles();

  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { authenticated } = useSelector((state) => state.user);
  const { loading, errors: err } = useSelector((state) => state.UI);

  const dispatch = useDispatch();

  useEffect(() => {
    if (err) {
      setErrors({ errors: err });
    }
    if (!err && !loading) {
      setBody("");
      setIsLoading(false);
    }
  }, [err, loading]);

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(submitComment(id, { body }));
  };

  return authenticated ? (
    <Grid
      sx={{ paddingTop: "0px !important" }}
      item
      sm={12}
      style={{ textAlign: "center" }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          size="small"
          name="body"
          type="text"
          label="Comment on scream"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={isLoading}
        >
          Submit
          {isLoading && (
            <CircularProgress size={20} className={classes.progressSpinner} />
          )}
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;
};

export default CommentForm;
