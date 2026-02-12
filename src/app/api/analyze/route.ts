import { NextResponse } from 'next/server';
import { analyzePhrase } from '@/lib/ai-service';
import { prisma } from '@/lib/prisma'; // Need to create this utility!

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { phrase } = body;

        if (!phrase || typeof phrase !== 'string') {
            return NextResponse.json(
                { error: 'Frase é obrigatória.' },
                { status: 400 }
            );
        }

        // 1. Check if analysis already exists in DB? (Optional caching layer)
        // const existing = await prisma.analysis.findFirst({ where: { phrase } });
        // if (existing) return NextResponse.json(existing);

        // 2. Perform AI Analysis
        const result = await analyzePhrase(phrase);

        // 3. Save to DB
        // 3. Save to DB (Temporarily disabled due to local environment Prisma Engine issues)
        // const savedAnalysis = await prisma.analysis.create({
        //     data: {
        //         phrase: result.phrase,
        //         verse: result.verse || "",
        //         fidelityGrade: result.fidelityGrade,
        //         literaryContext: result.literaryContext,
        //         historicalContext: result.historicalContext,
        //         linguisticAnalysis: result.linguisticAnalysis,
        //         interpretation: result.interpretation,
        //         errorDescription: result.errorDescription,
        //         properVerses: JSON.stringify(result.properVerses),
        //         application: result.application || "",
        //         isApproved: true
        //     }
        // });

        // return NextResponse.json(savedAnalysis);
        return NextResponse.json(result);

        return NextResponse.json(result);

    } catch (error) {
        console.error('CRITICAL ERROR in analyze route:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: String(error) },
            { status: 500 }
        );
    }
}
