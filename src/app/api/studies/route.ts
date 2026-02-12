import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AnalysisResult } from '@/lib/ai-service';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // For now, fetch all. In production, filter by isApproved: true
        // For now, fetch all. In production, filter by isApproved: true
        // const studies = await prisma.analysis.findMany({
        //     orderBy: { createdAt: 'desc' }
        // });
        const studies: any[] = [];

        // Transform to match AnalysisResult interface if needed
        // Prisma returns Date objects, AnalysisResult might need strings or we adapt.
        // The AnalysisResult interface in ai-service is for the AI output.
        // The DB model is similar but has ID and CreatedAt.

        // We can return the raw DB objects.
        return NextResponse.json(studies);

    } catch (error) {
        console.error('Error fetching studies:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
