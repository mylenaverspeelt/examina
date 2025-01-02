import { NextResponse } from 'next/server';
import { GlucoseService } from '@/services/glucose/getGlucose.service';

export async function GET() {
  try {
    const counts = await GlucoseService.getGlucoseCounts();
    return NextResponse.json(counts);
  } catch (error:unknown) {
    return NextResponse.json(
      { error: 'Erro ao buscar os resultados de glicose' + error }, 
      { status: 500 }
    );
  }
}