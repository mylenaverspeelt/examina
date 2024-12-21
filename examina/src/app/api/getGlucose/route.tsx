import { NextResponse } from 'next/server';
import { GlucoseService } from '@/services/GlucoseService/glucose.service';

export async function GET() {
  try {
    const counts = await GlucoseService.getGlucoseCounts();
    return NextResponse.json(counts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar os resultados de glicose' }, 
      { status: 500 }
    );
  }
}