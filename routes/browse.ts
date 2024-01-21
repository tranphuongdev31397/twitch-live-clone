const BROWSE_ROUTES = {
  PUBLIC: {
    HOME: "/",
    USERNAME: (username: string = ":username") => `/${username}`,
  },
  PRIVATE: {},
};

export { BROWSE_ROUTES };
