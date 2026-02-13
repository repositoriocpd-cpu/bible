import { NextResponse } from 'next/server';
import { analyzeFallacy } from '@/lib/ai-service';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fallacy, verse, userResponse, mode } = body;

        // 1. Perform AI analysis
        const result = await analyzeFallacy(fallacy, verse, userResponse, mode);

        // 2. Update Progress (Mock User for now)
        try {
            const user = await prisma.user.upsert({
                where: { email: 'user@example.com' },
                update: {},
                create: { email: 'user@example.com', name: 'Estudante' }
            });

            const currentProgress = await prisma.userProgress.findUnique({
                where: {
                    userId_fallacy: {
                        userId: user.id,
                        fallacy: fallacy
                    }
                }
            });

            if (!currentProgress) {
                await prisma.userProgress.create({
                    data: {
                        userId: user.id,
                        fallacy: fallacy,
                        attempts: 1,
                        correctAnswers: result.progressImpact.total >= 70 ? 1 : 0,
                        comprehensionLevel: result.progressImpact.total
                    }
                });
            } else {
                const newAttempts = currentProgress.attempts + 1;
                const newCorrect = result.progressImpact.total >= 70 ? currentProgress.correctAnswers + 1 : currentProgress.correctAnswers;
                const newLevel = Math.max(currentProgress.comprehensionLevel, result.progressImpact.total);

                await prisma.userProgress.update({
                    where: { id: currentProgress.id },
                    data: {
                        attempts: newAttempts,
                        correctAnswers: newCorrect,
                        comprehensionLevel: newLevel,
                        lastAccessed: new Date()
                    }
                });
            }
        } catch (dbError) {
            console.error("Erro ao salvar progresso:", dbError);
        }

        return NextResponse.json(result);

    } catch (error) {
        console.error('Erro na análise do lab:', error);
        return NextResponse.json(
            { error: 'Erro interno no servidor' },
            { status: 500 }
        );
    }
}
