import React, { useEffect } from "react";

import { Grid } from "@mui/material";
import Scream from "../components/Scream";
import Profile from "./../components/Profile";
import { useDispatch, useSelector } from "react-redux";
import { getScream } from "./../redux/actions/data-actions";

function Home() {
  const { loading, screams } = useSelector((state) => state.data);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getScream());
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container spacing={16}>
      <Grid item sm={8} xs={12}>
        {loading ? (
          <p>loading...</p>
        ) : (
          screams.map((scream) => <Scream key={scream.screamId} {...scream} />)
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
}

export default Home;
