import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Example User',
      email: 'example@example.com',
      avatarUrl: 'https://github.com/ItaloFL.png'
    }
  })

  const poll = await prisma.poll.create({
    data: {
      title: 'Example Poll',
      code: 'EX1234',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-06T14:00:00.533Z',
      fristTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-07T14:00:00.533Z',
      fristTeamCountryCode: 'JP',
      secondTeamCountryCode: 'BR',

      guesses: {
        create: {
          fristTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_pollId: {
                userId: user.id,
                pollId: poll.id
              }
            }
          }
        }
      }
    }
  })
}

main()
