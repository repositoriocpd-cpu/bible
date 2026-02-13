import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AnalysisResult } from '@/lib/ai-service';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // For now, fetch all. In production, filter by isApproved: true
        // For now, fetch all. In production, filter by isApproved: true
        const studies = await prisma.analysis.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(studies);

    } catch (error) {
        console.error('Error fetching studies:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
