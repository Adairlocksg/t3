import type { User } from "@clerk/nextjs/dist/types/server";

const filterUserFromClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    email: user.emailAddresses,
    profileImageUrl: user.profileImageUrl,
  };
};

export default filterUserFromClient;
