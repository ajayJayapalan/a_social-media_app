import { Badge, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationIcon from "@mui/icons-material/Notifications";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import { getTime } from "../utils/utility-functions";
import { Link } from "react-router-dom";
import { markNotificationsRead } from "../redux/actions/data-actions";

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.user.notifications);

  const handleOpen = (event) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuOpened = () => {
    let unreadNotificationsIds = notifications
      .filter((not) => !not.read)
      .map((not) => not.notificationId);
    dispatch(markNotificationsRead(unreadNotificationsIds));
  };

  let notificationIcon;
  let notificationCount = notifications.filter(
    (not) => not.read === false
  ).length;

  if (notifications?.length > 0) {
    notificationIcon =
      notificationCount > 0 ? (
        <Badge badgeContent={notificationCount} color="secondary">
          <NotificationIcon />
        </Badge>
      ) : (
        <NotificationIcon />
      );
  } else {
    notificationIcon = <NotificationIcon />;
  }

  let notificationsMarkup =
    notifications?.length > 0 ? (
      notifications.map((not) => {
        const verb = not.type === "like" ? "liked" : "commented on";
        const time = getTime(not.createdAt);
        const iconColor = not.read ? "primary" : "secondary";
        const icon =
          not.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <MenuItem key={not.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color="default"
              variant="body1"
              to={`/users/${not.recipient}/scream/${not.screamId}`}
            >
              {not.sender} {verb} your scream {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );

  return (
    <>
      <IconButton
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
      >
        {notificationIcon}{" "}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </>
  );
};

export default Notification;
