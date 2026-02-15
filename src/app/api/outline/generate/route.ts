import { NextResponse } from "next/server";
import { generateOutline, OutlineRequest } from "@/lib/ai-service";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const body: OutlineRequest = await req.json();

        if (!body.title || !body.studyType) {
            return NextResponse.json(
                { error: "Título e Tipo de Estudo são obrigatórios." },
                { status: 400 }
            );
        }

        const result = await generateOutline(body);

        return NextResponse.json({ markdown: result });
    } catch (error) {
        console.error("Erro na geração de esboço:", error);
        return NextResponse.json(
            { error: "Erro interno ao gerar o esboço." },
            { status: 500 }
        );
    }
}
