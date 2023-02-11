import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create ({
        data: {
            name: 'Fulano de tal',
            email: 'fulano@detal.com.br',
            avatarUrl: 'https://avatars.githubusercontent.com/u/100084489?v=4'
        }
    });

    const pool = await prisma.pool.create({
        data: {
            tittle: 'Example pool',
            code: 'BOL123',
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
            date: '2022-11-02T12:00:11.862Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-03T12:00:11.862Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoinst: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,

                            }
                        }
                    }
                }
            }
        }
    })
    
}

main()