import { User } from "@prisma/client";

type CreateUserParams = Pick<User, "username" | "imageUrl" | "externalUserId">;

export type { CreateUserParams };
