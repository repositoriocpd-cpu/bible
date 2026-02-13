import { NextResponse } from 'next/server';
import { analyzePhrase } from '@/lib/ai-service';
import { prisma } from '@/lib/prisma'; // Need to create this utility!

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { phrase, mode } = body;

        if (!phrase || typeof phrase !== 'string') {
            return NextResponse.json(
                { error: 'Frase é obrigatória.' },
                { status: 400 }
            );
        }

        // 2. Perform AI Analysis with selected mode
        const result = await analyzePhrase(phrase, mode);

        // 3. Save to DB (Adapting to polymorphic results)
        try {
            // For the multi-mode SaaS, we store metadata in flat fields if they exist,
            // and the full result as a JSON blob if necessary. 
            // My current schema is flat, so I'll map what I can and leave rest.

            const savedAnalysis = await prisma.analysis.create({
                data: {
                    phrase: result.phrase,
                    existsInBible: (result as any).existsInBible ?? (result as any).isBiblical ?? false,
                    exactReference: (result as any).exactReference ?? (result as any).primaryReference ?? (result as any).reference ?? "Não referenciado",
                    literaryGenre: (result as any).literaryGenre || "Não aplicável",
                    fidelityGrade: (result as any).fidelityGrade || "MÉDIA",
                    immediateContext: typeof (result as any).immediateContext === 'string'
                        ? (result as any).immediateContext
                        : (result as any).immediateContext?.pericopeSummary || "",
                    historicalContext: typeof (result as any).historicalContext === 'string'
                        ? (result as any).historicalContext
                        : (result as any).historicalCulturalContext?.setting || "",
                    linguisticAnalysis: (result as any).linguisticAnalysis || "",
                    commonInterpretation: (result as any).commonInterpretation || (result as any).whatPeopleUsuallyMean || "",
                    interpretiveError: (result as any).interpretiveError || (result as any).commonMistake || "",
                    correctExegesis: (result as any).correctExegesis?.senseOriginal || (result as any).correctExegesis || (result as any).whatTheBibleActuallyTeaches || "",
                    canonicalTheology: (result as any).canonicalTheology || "",
                    properRelatedVerses: JSON.stringify((result as any).properRelatedVerses || (result as any).supportingVerses || (result as any).relatedVerses || []),
                    balancedApplication: (result as any).balancedApplication || (result as any).safeApplicationToday || (result as any).application?.timelessPrinciple || "",
                    hermeneuticalPrinciplesUsed: JSON.stringify((result as any).hermeneuticalPrinciplesUsed || []),
                    isApproved: true
                }
            });
            return NextResponse.json({ ...result, id: savedAnalysis.id });
        } catch (dbError) {
            console.error("Database save failed, returning AI result only:", dbError);
            return NextResponse.json(result);
        }
    } catch (error) {
        console.error('CRITICAL ERROR in analyze route:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: String(error) },
            { status: 500 }
        );
    }
}
