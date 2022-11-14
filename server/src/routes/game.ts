import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { Authenticate } from '../plugins/authenticate'

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/polls/:id/games',
    { onRequest: [Authenticate] },
    async request => {
      const getGamesObject = z.object({
        id: z.string()
      })

      const { id } = getGamesObject.parse(request.params)

      const games = await prisma.game.findMany({
        orderBy: {
          date: 'desc'
        },
        include: {
          guesses: {
            where: {
              participant: {
                userId: request.user.sub,
                pollId: id
              }
            }
          }
        }
      })

      return { 
        games: games.map((game) => {
          return {
            ...game,
            guess: game.guesses.length > 0 ? game.guesses[0] : null,
            guesses: undefined
          }
        })
       }
    }
  )
}
