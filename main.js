const { PrismaClient } = require('@prisma/client');
const { joinGame } = require('./game.service');

const prisma = new PrismaClient();

async function main() {
    // יוצר משתמש לדמו
    const user = await prisma.user.create({
        data: {
            name: 'Test User',
            email: 'test@example.com'
        }
    });

    // יוצר משחק לדמו בסטטוס Waiting
    const game = await prisma.game.create({
        data: {
            title: 'Test Game',
            status: 'Waiting'
        }
    });

    // מנסה להצטרף למשחק
    try {
        await joinGame(user.id, game.id);
        console.log('Success: User joined game');
    } catch (error) {
        console.log('Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();