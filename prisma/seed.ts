import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const storedRoles = await prisma.role.findMany()
  if (storedRoles.length === 0) {
    await prisma.role.createMany({
      data: [
        {
          name: 'Head of Administrator',
          code: 'HEAD_OF_ADMINISTRATOR',
          description: 'Responsible for maintaining EQExp',
        },
        {
          name: 'Live online video host',
          code: 'LIVE_ONLINE_VIDEO_HOST',
          description: 'Responsible for hosting live online meeting'
        },
        {
          name: 'Qurban Registration Contact Person',
          code: 'QURBAN_REGISTRATION_CONTACT_PERSON',
          description: 'Responsible for qurban registration'
        },
        {
          name: 'Qurban Slaughter Tracking Administrator',
          code: 'QURBAN_SLAUGHTER_TRACKING_ADMINISTRATOR',
          description: 'Responsible for give realtime update related to qurban slaughtering'
        },
        {
          name: 'Qurban Meat Delivery Administrator',
          code: 'QURBAN_MEAT_DELIVERY_ADMINISTRATOR',
          description: 'Responsible for sending qurban meats to citizens'
        }
      ]
    })
  }
  if (storedRoles.length === 5) {
    await prisma.role.create({
      data: {
        name: 'Citizen',
        code: 'CITIZEN',
        description: 'Users which doesnt registered as Qurban committee',
      }
    })
  }
}

(async () => {
  try {
    await main()
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
})()