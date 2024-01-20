type Stream = {
  create: {
    name: string;
  };
};

type CreateUserParams = {
  username: string;
  imageUrl: string;
  externalUserId: string;
  stream: Stream;
};

export type { CreateUserParams };
