import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { nanoid } from "nanoid";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.prisma.user.findMany();
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.user.create({
          data: {
            id: nanoid(),
            name: input.name,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
