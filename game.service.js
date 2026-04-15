const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function joinGame(userId, gameId) {
    // בודק שהמשחק קיים
    const game = await prisma.game.findUnique({
        where: { id: gameId }
    });

    if (!game) {
        throw new Error('המשחק לא נמצא');
    }

    // בודק שהמשחק בסטטוס Waiting
    if (game.status === 'Live') {
        throw new Error('המשחק כבר התחיל, לא ניתן להצטרף');
    }

    if (game.status === 'Finished') {
        throw new Error('המשחק הסתיים, לא ניתן להצטרף');
    }

    // בודק שהמשתמש לא רשום כבר
    const existing = await prisma.gameParticipant.findFirst({
        where: { userId, gameId }
    });

    if (existing) {
        throw new Error('המשתמש כבר רשום למשחק זה');
    }

    // רושם את המשתמש למשחק
    const participant = await prisma.gameParticipant.create({
        data: {
            userId,
            gameId,
            role: 'Player'
        }
    });

    return participant;
}

module.exports = { joinGame };