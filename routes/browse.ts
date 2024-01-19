const BROWSE_ROUTES = {
  PUBLIC: {
    HOME: "/",
    USER_PROFILE: (username: string = ":username") => `/${username}`,
  },
  PRIVATE: {},
};

export { BROWSE_ROUTES };
