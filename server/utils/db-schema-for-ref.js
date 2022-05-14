let db = {
  users: [
    {
      userId: "slfjlsfohsou2083u8oh",
      email: "user@mail.com",
      handle: "user",
      createdAt: "created time",
      imgUrl: "image/sfdsd/afdas",
      bio: "Iam someone",
      website: "https://user.com",
      location: "London, UK",
    },
  ],

  screams: [
    {
      id: "id",
      userHandle: "user",
      body: "this the scream body",
      createdAt: "created time",
      likeCount: 5,
      commentCount: 2,
    },
  ],

  comments: [
    {
      userHandle: "user",
      screamId: "id of scream",
      body: "nice one mate",
      createdAt: "date here",
    },
  ],

  notifications: [
    {
      createdAt: "time",
      read: false,
      recipient: "user",
      sender: "new2",
      screamId: "id of scream",
      type: "like",
    },
  ],
};

// Redux Data

const userDetails = {
  credentials: {
    userId: "slfjlsfohsou2083u8oh",
    email: "user@mail.com",
    handle: "user",
    createdAt: "created time",
    imgUrl: "image/sfdsd/afdas",
    bio: "Iam someone",
    website: "https://user.com",
    location: "London, UK",
  },
  likes: [
    {
      userHandle: "user1",
      screamId: "jsdljsjfsj",
    },
    {
      userHandle: "user2",
      screamId: "jsdljsjfsj",
    },
  ],
};
