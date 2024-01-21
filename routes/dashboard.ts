const DASHBOARD_ROUTES = {
  PUBLIC: {},
  PRIVATE: {
    STREAM: (username = ":username") => `/u/${username}`,
    KEYS: (username = ":username") => `/u/${username}/keys`,
    CHAT: (username = ":username") => `/u/${username}/chat`,
    COMMUNITY: (username = ":username") => `/u/${username}/community`,
  },
};

export { DASHBOARD_ROUTES };
