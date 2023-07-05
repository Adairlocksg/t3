import { type User, clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import filterUserFromClient from "~/server/helpers/filterUserForClient";

export const profileRouter = createTRPCRouter({
  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const user = await clerkClient.users.getUser(input.id);

      return filterUserFromClient(user);
      /* const [user] = await clerkClient.users.get({
        id: input.id,
      });

      if (!user)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Não foi encontrado o usuário ${input.userName}`,
        });

      return filterUserFromClient(user); */
    }),
});
