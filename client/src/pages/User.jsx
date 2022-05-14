import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Scream from "../components/Scream";
import StaticProfile from "../components/StaticProfile";
import { getOneUserData } from "../redux/actions/data-actions";

const User = () => {
  const [profile, setProfile] = useState(null);
  const [screamId, setScreamId] = useState(null);

  const { screams, loading } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const { handle, screamId: id } = useParams();

  useEffect(() => {
    if (id) setScreamId(id);
    dispatch(getOneUserData(handle));
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  const screamsMarkup = loading ? (
    <p>loading...</p>
  ) : screams === null ? (
    <p>No screams from this user</p>
  ) : !screamId ? (
    screams.map((scream) => <Scream key={scream.screamId} {...scream} />)
  ) : (
    screams.map((scream) => {
      if (scream.screamId !== screamId)
        return <Scream key={scream.screamId} {...scream} />;
      else return <Scream key={scream.screamId} {...scream} openDialog />;
    })
  );

  console.log(screamsMarkup);

  return (
    <Grid container spacing={16}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <p>loading...</p>
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
};

export default User;
