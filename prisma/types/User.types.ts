type Stream = {
  create: {
    name: string;
  };
};

type CreateUserParams = {
  username: string;
  imageUrl: string;
  externalUserId: string;
};

export type { CreateUserParams };
